// Saved tracker state: earned trophies, per-trophy notes and the spoiler setting.
// Everything lives in one localStorage key so export/import is a single JSON file.
export const STORAGE_KEY = 'gta6-trophy-guide-v1';
export const DEFAULT_SELECTED_ID = 28;

export function loadSavedState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return {
      earned: new Set(Array.isArray(parsed.earned) ? parsed.earned : []),
      notes: typeof parsed.notes === 'object' && parsed.notes !== null ? parsed.notes : {},
      spoiler: parsed.spoiler === true,
    };
  } catch {
    return { earned: new Set(), notes: {}, spoiler: false };
  }
}

export function persistSavedState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    earned: [...state.earned],
    notes: state.notes,
    spoiler: state.spoiler,
  }));
}

export function toggleEarned(state, trophyId) {
  if (state.earned.has(trophyId)) state.earned.delete(trophyId);
  else state.earned.add(trophyId);
  persistSavedState(state);
}

export function saveTrophyNote(state, trophyId, text) {
  state.notes[trophyId] = text;
  persistSavedState(state);
}

export function gradeCounts(trophies, earned) {
  const counts = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const trophy of trophies) {
    if (earned.has(trophy.id)) counts[trophy.grade] = (counts[trophy.grade] ?? 0) + 1;
  }
  return counts;
}
