// Leonida Platinum — tracker for the 55 GTA VI trophies.
// Checklist state lives in localStorage under KEY; export/import move it as JSON.
// URL hash can preset a view, which is also how the screenshots are taken:
//   #grade=silver  #kind=collectible  #missable=1  #roadmap  #open=17  #spoilers=off
const KEY = 'leonida-platinum-progress-v1';
const listEl = document.getElementById('trophyList');
const countEl = document.getElementById('resultCount');
const searchEl = document.getElementById('search');
const gradeEl = document.getElementById('gradeFilter');
const kindEl = document.getElementById('kindFilter');
const missableEl = document.getElementById('missableOnly');
const spoilerEl = document.getElementById('spoilerToggle');

const ROADMAP = [
  { title: 'Play the story, Chapters 1–4', text: 'Follow the mission markers in order. Chapter trophies (Paradise Lost through Top Of The World, Ma) and the named missions (Breakfast Run, The Cartel Heist, Headliners, VCIA Takedown, Operation Savage Glory) all pop as you go.', warn: false },
  { title: 'Do the partner trophies while you can', text: 'Hot Together and Retail Therapy need your partner beside you in free roam, and Personal Best needs partner content — all before the final missions. Do these the moment free roam opens up between story beats.', warn: true },
  { title: 'Take the one-off chances when they appear', text: 'Beat Cal when he challenges you to fish, hunt Bret\'s unique animal on first offer, and save before every big story choice (Actions Speak Louder). A failed one-off is a reload, not a replay.', warn: true },
  { title: 'Finish the story and the finale', text: 'Complete the final mission for You Gotta Know When to Get Off (gold). Make a manual save right before the finale starts.', warn: false },
  { title: 'Clear the stranger strands', text: 'Finish Andy, Kenton, Billy, Randy and Tyrone, then find three more stranger markers — 8 strands in total for Strangers & Freaks (silver). Strands stay open after the story.', warn: false },
  { title: 'Sweep the collectibles', text: 'Meditation spots (18), card sets (3), WAiNK locations (100), vehicles discovered (100), all 52 areas of Leonida, and the 8 garage properties. Work region by region and let the map tell you what is left.', warn: false },
  { title: 'Grind the activities', text: '250 stunts, gold in all 42 Shooting Range challenges, drone races at all 14 locations, 20 different race wins, 50 challenges, and the robbery set — 5 bank vaults, armored trucks, jewelry store undetected, one illegal operation per gang.', warn: false },
  { title: 'Mop up the money and the odd ones', text: 'Launder $250,000 of marked bills, spend $100,000 in shops, register 10 vehicles in the Scooter Bros app, then grab the moment trophies: the Ocean Beach cocktail, the showroom smash, bowling, the Rhino, the VCIA departure, and the strange night event. Then 100% Completion (gold) and the platinum.', warn: false },
];

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

let earned = new Set();
try { earned = new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]')); } catch { earned = new Set(); }
function save() { localStorage.setItem(KEY, JSON.stringify([...earned])); }

const data = await (await fetch('data/trophies.json')).json();
const trophies = data.trophies;

function renderRoadmap() {
  const ol = document.getElementById('roadmapSteps');
  for (const step of ROADMAP) {
    const li = el('li');
    if (step.warn) li.className = 'warn';
    li.append(el('strong', null, step.title), el('p', null, step.text));
    ol.append(li);
  }
}

function spoilerHidden(t) {
  return spoilerEl.checked && !earned.has(t.id) && t.kind === 'story';
}

function render() {
  const q = searchEl.value.trim().toLowerCase();
  const grade = gradeEl.value;
  const kind = kindEl.value;
  const missOnly = missableEl.checked;
  listEl.replaceChildren();
  let shown = 0;
  for (const t of trophies) {
    if (grade !== 'all' && t.grade !== grade) continue;
    if (kind !== 'all' && t.kind !== kind) continue;
    if (missOnly && !t.missable) continue;
    if (q && !(t.name + ' ' + t.description + ' ' + t.guide).toLowerCase().includes(q)) continue;
    shown++;
    const li = el('li', 'trophy' + (earned.has(t.id) ? ' earned' : ''));
    li.id = 'trophy-' + t.id;
    const head = el('div', 'trophy-head');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.id);
    box.setAttribute('aria-label', 'Mark ' + t.name + ' as earned');
    box.addEventListener('change', () => {
      if (box.checked) earned.add(t.id); else earned.delete(t.id);
      save();
      render();
    });
    const title = el('div', 'trophy-title');
    const h = el('h3');
    h.append(el('span', 'num', '#' + t.id), document.createTextNode(t.name));
    title.append(h, el('p', 'trophy-desc', spoilerHidden(t) ? 'Story trophy — details hidden until earned (turn off “Hide story spoilers” to reveal).' : t.description));
    head.append(box, title, el('span', 'badge ' + t.grade, t.grade), el('span', 'kind', t.kind));
    li.append(head);
    if (t.missable) li.append(el('span', 'flag', '⚠ Missable — ' + t.missable_when));
    const toggle = el('button', 'guide-toggle', 'Show guide');
    toggle.type = 'button';
    const guide = el('div', 'guide');
    guide.hidden = true;
    if (spoilerHidden(t)) {
      guide.append(el('p', 'spoiler', 'Guide hidden with spoilers. Earn this trophy, or turn off the spoiler toggle, to read it.'));
    } else {
      guide.append(el('p', null, t.guide));
      if (t.missable) guide.append(el('p', 'miss-when', 'Missable: ' + t.missable_when));
      guide.append(el('p', 'src', 'Source: ' + t.sources));
    }
    toggle.addEventListener('click', () => {
      guide.hidden = !guide.hidden;
      toggle.textContent = guide.hidden ? 'Show guide' : 'Hide guide';
    });
    li.append(toggle, guide);
    listEl.append(li);
  }
  document.getElementById('emptyState').hidden = shown !== 0;
  countEl.textContent = `Showing ${shown} of ${trophies.length} trophies · ${earned.size} earned`;
  const pct = Math.round((earned.size / trophies.length) * 100);
  document.getElementById('earnedCount').textContent = earned.size;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = pct + '% to the platinum';
  document.getElementById('progressBarWrap').setAttribute('aria-valuenow', String(earned.size));
}

function applyHash() {
  const h = new URLSearchParams(location.hash.slice(1));
  if (h.get('grade')) gradeEl.value = h.get('grade');
  if (h.get('kind')) kindEl.value = h.get('kind');
  if (h.get('missable') === '1') missableEl.checked = true;
  if (h.get('spoilers') === 'off') spoilerEl.checked = false;
  render();
  if (h.get('roadmap') !== null) {
    document.getElementById('roadmap').scrollIntoView();
  }
  const open = Number(h.get('open'));
  if (open) {
    const card = document.getElementById('trophy-' + open);
    if (card) {
      card.scrollIntoView({ block: 'center' });
      const btn = card.querySelector('.guide-toggle');
      if (btn) btn.click();
    }
  }
}

for (const input of [searchEl, gradeEl, kindEl, missableEl, spoilerEl]) {
  input.addEventListener('input', render);
  input.addEventListener('change', render);
}

document.getElementById('exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ game: 'Grand Theft Auto VI', earned: [...earned].sort((a, b) => a - b) }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'leonida-platinum-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById('importFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const ids = Array.isArray(parsed) ? parsed : parsed.earned;
    const valid = new Set(trophies.map((t) => t.id));
    earned = new Set(ids.filter((n) => valid.has(n)));
    save();
    render();
  } catch {
    alert('That file could not be imported — it is not a valid progress file.');
  }
  e.target.value = '';
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Clear all 55 checkboxes?')) {
    earned = new Set();
    save();
    render();
  }
});

renderRoadmap();
applyHash();
