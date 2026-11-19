// Rendering: the checklist rows, the guide pane, the roadmap stages and Next-up.
// A trophy is masked when the spoiler setting (or the hidden-names toggle) hides it
// and it is not earned yet: its name and description are replaced, never its grade.
import { ROADMAP_STAGES, nextUpTrophies, stageTrophies } from './roadmap.js';

export function isMasked(trophy, state, showHidden) {
  if (state.earned.has(trophy.id)) return false;
  if (state.spoiler && (trophy.hidden || trophy.kind === 'story')) return true;
  if (!showHidden && trophy.hidden) return true;
  return false;
}

function trophyMatchesFilters(trophy, ui, state) {
  if (ui.kind === 'missable' && !trophy.missable) return false;
  if (ui.kind !== 'all' && ui.kind !== 'missable' && trophy.kind !== ui.kind) return false;
  if (ui.grade !== 'all' && trophy.grade !== ui.grade) return false;
  if (ui.earnedFilter === 'earned' && !state.earned.has(trophy.id)) return false;
  if (ui.earnedFilter === 'remaining' && state.earned.has(trophy.id)) return false;
  if (ui.search) {
    const hay = `${trophy.name} ${trophy.description} ${trophy.guide}`.toLowerCase();
    if (!hay.includes(ui.search.toLowerCase())) return false;
  }
  return true;
}

export function renderTrophyList(listEl, trophies, state, ui, onSelect, onToggle) {
  listEl.replaceChildren();
  const shown = trophies.filter((t) => trophyMatchesFilters(t, ui, state));
  if (shown.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'No trophy matches these filters.';
    listEl.append(empty);
    return;
  }
  for (const trophy of shown) {
    const masked = isMasked(trophy, state, ui.showHidden);
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'trophy-row' + (state.earned.has(trophy.id) ? ' earned' : '') + (ui.selectedId === trophy.id ? ' selected' : '');
    row.addEventListener('click', () => onSelect(trophy.id));
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = state.earned.has(trophy.id);
    box.setAttribute('aria-label', `Mark ${trophy.name} earned`);
    box.addEventListener('click', (event) => {
      event.stopPropagation();
      onToggle(trophy.id);
    });
    const text = document.createElement('span');
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = masked ? 'Hidden trophy — earn it to reveal' : trophy.name;
    const desc = document.createElement('span');
    desc.className = 'desc';
    desc.textContent = masked ? 'Spoiler-safe: name and description hidden until earned.' : trophy.description;
    const meta = document.createElement('span');
    meta.className = 'meta';
    const medal = document.createElement('span');
    medal.className = `medal ${trophy.grade}`;
    meta.append(medal, document.createTextNode(trophy.kind === trophy.grade ? trophy.grade : `${trophy.grade} · ${trophy.kind}`));
    if (trophy.target !== null && trophy.target !== undefined) {
      const count = document.createElement('span');
      count.className = 'badge count';
      count.textContent = `PSN 0/${trophy.target}`;
      meta.append(count);
    }
    if (trophy.missable) {
      const badge = document.createElement('span');
      badge.className = 'badge missable';
      badge.textContent = 'POSSIBLY MISSABLE';
      meta.append(badge);
    }
    if (trophy.hidden) {
      const badge = document.createElement('span');
      badge.className = 'badge hidden-badge';
      badge.textContent = 'HIDDEN';
      meta.append(badge);
    }
    if (trophy.unconfirmed) {
      const badge = document.createElement('span');
      badge.className = 'badge unconfirmed';
      badge.textContent = 'NOT YET CONFIRMED';
      meta.append(badge);
    }
    text.append(name, document.createElement('br'), desc, document.createElement('br'), meta);
    const check = document.createElement('span');
    check.textContent = state.earned.has(trophy.id) ? '✓' : '';
    check.setAttribute('aria-hidden', 'true');
    row.append(box, text, check);
    listEl.append(row);
  }
}

export function renderGuidePane(paneEl, trophy, state, showHidden, onNote) {
  paneEl.replaceChildren();
  if (!trophy) {
    paneEl.textContent = 'Select a trophy to read its guide.';
    return;
  }
  const masked = isMasked(trophy, state, showHidden);
  const title = document.createElement('h2');
  title.textContent = masked ? 'Hidden trophy' : trophy.name;
  const official = document.createElement('p');
  official.className = 'official';
  official.textContent = masked
    ? 'Spoiler-safe: this story trophy is hidden until you earn it.'
    : `“${trophy.description}” — official description · ${trophy.grade}`;
  const guide = document.createElement('p');
  guide.className = 'guide-text';
  guide.textContent = masked ? 'Its guide is hidden with it. Earn the trophy, or turn the spoiler setting off, to read the guide.' : trophy.guide;
  paneEl.append(title, official, guide);
  if (!masked) {
    const source = document.createElement('p');
    source.className = 'source';
    source.textContent = `Source: ${trophy.source} — `;
    const link = document.createElement('a');
    link.href = trophy.source_url;
    link.textContent = trophy.source_url.replace('https://www.', '');
    link.target = '_blank';
    link.rel = 'noopener';
    source.append(link);
    if (trophy.unconfirmed) {
      const note = document.createElement('p');
      note.className = 'source';
      note.textContent = 'Label: method not yet confirmed at launch (19 Nov 2026). No unlock steps are claimed as fact.';
      paneEl.append(source, note);
    } else {
      paneEl.append(source);
    }
    const noteLabel = document.createElement('label');
    noteLabel.textContent = 'Your note (saved in this browser):';
    const note = document.createElement('textarea');
    note.value = state.notes[trophy.id] ?? '';
    note.placeholder = 'e.g. Doing this after Chapter 3…';
    note.addEventListener('input', () => onNote(trophy.id, note.value));
    paneEl.append(noteLabel, note);
  }
}

export function renderRoadmap(stagesEl, trophies, state) {
  stagesEl.replaceChildren();
  for (const stage of ROADMAP_STAGES) {
    const members = trophies.filter((t) => t.stage === stage.number);
    const earnedCount = members.filter((t) => state.earned.has(t.id)).length;
    const pct = members.length === 0 ? 0 : Math.round((earnedCount / members.length) * 100);
    const card = document.createElement('div');
    card.className = 'stage';
    const heading = document.createElement('h2');
    heading.innerHTML = '';
    const stageLabel = document.createElement('span');
    stageLabel.textContent = `Stage ${stage.number} — `;
    heading.append(stageLabel, document.createTextNode(stage.title));
    const hours = document.createElement('p');
    hours.textContent = stage.hours;
    const body = document.createElement('p');
    body.textContent = stage.body;
    const list = document.createElement('ul');
    for (const bullet of stage.bullets) {
      const item = document.createElement('li');
      item.textContent = bullet;
      list.append(item);
    }
    const bar = document.createElement('div');
    bar.className = 'bar';
    const fill = document.createElement('i');
    fill.style.width = `${pct}%`;
    bar.append(fill);
    const progress = document.createElement('p');
    progress.textContent = `Stage progress: ${earnedCount} of ${members.length} trophies earned (${pct}%)`;
    card.append(heading, hours, body, list, bar, progress);
    stagesEl.append(card);
  }
}

export function renderNextUp(nextUpEl, trophies, state) {
  nextUpEl.replaceChildren();
  const heading = document.createElement('h2');
  heading.textContent = 'Next up — your next trophies in roadmap order';
  const list = document.createElement('ol');
  for (const trophy of nextUpTrophies(trophies, state.earned, 4)) {
    const item = document.createElement('li');
    item.textContent = `${trophy.name} — Stage ${trophy.stage}, ${trophy.grade}${trophy.missable ? ' · POSSIBLY MISSABLE' : ''}`;
    list.append(item);
  }
  nextUpEl.append(heading, list);
}

export function stageProgressFor(stageNumber, trophies, state) {
  const members = stageTrophies(trophies, stageNumber);
  return { total: members.length, earned: members.filter((t) => state.earned.has(t.id)).length };
}
