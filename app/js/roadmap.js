// The platinum roadmap: three stages from PowerPyx, and the Next-up planner,
// which lists the next few trophies in roadmap order that are not yet earned.
export const ROADMAP_STAGES = [
  {
    number: 1,
    title: 'Story + optional missions',
    hours: '60–80 hours',
    body: 'Play all 5 chapters. Do optional missions as soon as they appear, and scan vehicles (WAiNK app) plus study animals (binoculars) during the story — the 100% checklist only appears after the story, but progress made now already counts.',
    bullets: [
      'Watch for the one possibly missable moment: the Chapter 1 balcony meditation for Positive Mental Attitude.',
      'Start character questlines as they are marked: Cal (fishing), Kenton (shipwrecks), Billy, Andy, Tyrone, Randy, Bret.',
      'Save at the start and end of every chapter.',
    ],
  },
  {
    number: 2,
    title: '100% checklist + 70 of 80 Challenges',
    hours: '~100 hours',
    body: 'Open Progress, Stats, 100% Completion after the story. Only part of each category is required: 100 optional missions, 200 of 277 vehicles, 100 of 255 animals, 15 of 18 meditations, 70 of 80 challenges, 300 stunts, 100 WAiNK scans.',
    bullets: [
      'Must be complete in full: all robberies, 8 bank vaults, 39 gang operations, Underwater Discoveries, all gold Shooting Ranges, all drone races, 15 Target Deck entries for Bret.',
      'Nothing in this checklist is missable — everything can be done in free-roam after the story.',
      'Hardest trophy of the game lives here: A Long Road (100% completion).',
    ],
  },
  {
    number: 3,
    title: 'Strangers & Freaks + cleanup',
    hours: '~10 hours',
    body: 'Finish the 8 stranger strands that count (Kirk, Kyle, Yago and Pilot Pete confirmed) and clean up the remaining misc trophies: stealing a plane at VCIA, stealing a tank at Mile Zero, max Strength for both characters, 500 Criminal Profile actions.',
    bullets: [
      'Strangers & Freaks strands are NOT needed for 100% completion.',
      'Five trophies are still unconfirmed at launch — check their guides before chasing rumours.',
      'The platinum pops as soon as the 54th other trophy is earned.',
    ],
  },
];

export function stageTrophies(trophies, stageNumber) {
  return trophies.filter((t) => t.stage === stageNumber || (stageNumber === 1 && t.stage === 1));
}

export function nextUpTrophies(trophies, earned, limit = 4) {
  const order = [...trophies].sort((a, b) => {
    if (a.stage !== b.stage) return a.stage - b.stage;
    if (a.missable !== b.missable) return a.missable ? -1 : 1;
    return a.id - b.id;
  });
  return order.filter((t) => !earned.has(t.id)).slice(0, limit);
}
