// Bootstrap: load the trophy data, wire the filters, views, spoiler setting,
// export/import and notes, and keep the progress header in sync.
import { DEFAULT_SELECTED_ID, gradeCounts, loadSavedState, persistSavedState, saveTrophyNote, toggleEarned } from './state.js';
import { renderGuidePane, renderNextUp, renderRoadmap, renderTrophyList } from './render.js';

const params = new URLSearchParams(location.search);
const state = loadSavedState();
if (params.get('spoiler') === 'on') state.spoiler = true;

const ui = {
  search: '',
  kind: 'all',
  grade: 'all',
  earnedFilter: 'all',
  showHidden: true,
  selectedId: Number(params.get('select') ?? DEFAULT_SELECTED_ID) || DEFAULT_SELECTED_ID,
};

const listEl = document.getElementById('trophy-list');
const paneEl = document.getElementById('guide-pane');
const progressBig = document.getElementById('progress-big');
const progressPct = document.getElementById('progress-pct');
const progressFill = document.getElementById('progress-fill');
const gradeBreak = document.getElementById('grade-break');
const searchInput = document.getElementById('search');
const kindSelect = document.getElementById('kind');
const gradeSelect = document.getElementById('grade');
const earnedSelect = document.getElementById('earned-filter');
const showHiddenBox = document.getElementById('show-hidden');
const spoilerBox = document.getElementById('spoiler');

const doc = await (await fetch('data/trophies.json')).json();
const trophies = doc.trophies;

function selectedTrophy() {
  return trophies.find((t) => t.id === ui.selectedId) ?? trophies[0];
}

function renderAll() {
  renderTrophyList(listEl, trophies, state, ui,
    (id) => { ui.selectedId = id; renderAll(); },
    (id) => { toggleEarned(state, id); renderAll(); });
  renderGuidePane(paneEl, selectedTrophy(), state, ui.showHidden,
    (id, text) => saveTrophyNote(state, id, text));
  renderRoadmap(document.getElementById('roadmap-stages'), trophies, state);
  renderNextUp(document.getElementById('next-up'), trophies, state);
  const earnedCount = state.earned.size;
  progressBig.textContent = `${earnedCount} of ${trophies.length} earned`;
  progressPct.textContent = `${Math.round((earnedCount / trophies.length) * 100)}%`;
  progressFill.style.width = `${(earnedCount / trophies.length) * 100}%`;
  const counts = gradeCounts(trophies, state.earned);
  gradeBreak.innerHTML = '';
  gradeBreak.append(
    document.createTextNode('Earned: '),
    Object.assign(document.createElement('b'), { textContent: `${counts.platinum} platinum` }),
    document.createTextNode(' · '),
    Object.assign(document.createElement('b'), { textContent: `${counts.gold} gold` }),
    document.createTextNode(' · '),
    Object.assign(document.createElement('b'), { textContent: `${counts.silver} silver` }),
    document.createTextNode(' · '),
    Object.assign(document.createElement('b'), { textContent: `${counts.bronze} bronze` }),
  );
}

function switchView(name) {
  for (const view of document.querySelectorAll('.view')) {
    view.classList.toggle('active', view.id === `view-${name}`);
  }
  for (const button of document.querySelectorAll('nav.tabs button')) {
    button.classList.toggle('active', button.dataset.view === name);
  }
}

for (const button of document.querySelectorAll('nav.tabs button')) {
  button.addEventListener('click', () => switchView(button.dataset.view));
}

searchInput.addEventListener('input', () => { ui.search = searchInput.value; renderAll(); });
kindSelect.addEventListener('change', () => { ui.kind = kindSelect.value; renderAll(); });
gradeSelect.addEventListener('change', () => { ui.grade = gradeSelect.value; renderAll(); });
earnedSelect.addEventListener('change', () => { ui.earnedFilter = earnedSelect.value; renderAll(); });
showHiddenBox.addEventListener('change', () => { ui.showHidden = showHiddenBox.checked; renderAll(); });
spoilerBox.addEventListener('change', () => { state.spoiler = spoilerBox.checked; persistSavedState(state); renderAll(); });

document.getElementById('export').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ earned: [...state.earned], notes: state.notes, spoiler: state.spoiler }, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'gta6-trophy-progress.json';
  link.click();
  URL.revokeObjectURL(link.href);
});

document.getElementById('import').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (Array.isArray(imported.earned)) state.earned = new Set(imported.earned.filter((id) => trophies.some((t) => t.id === id)));
    if (typeof imported.notes === 'object' && imported.notes !== null) state.notes = imported.notes;
    if (typeof imported.spoiler === 'boolean') state.spoiler = imported.spoiler;
    persistSavedState(state);
    spoilerBox.checked = state.spoiler;
  } catch {
    alert('That file is not a valid progress export.');
  }
  renderAll();
});

showHiddenBox.checked = ui.showHidden;
spoilerBox.checked = state.spoiler;
switchView(params.get('view') ?? 'checklist');
renderAll();
