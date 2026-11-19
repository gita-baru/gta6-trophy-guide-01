# Leonida Platinum — GTA VI Trophy Guide

An offline guide and tracker for the 55 PlayStation 5 trophies of Grand Theft Auto VI: every trophy with its official name, description and grade, a guide in the author's own words with its source cited beside it, a three-stage roadmap to the platinum, the one possibly missable trophy flagged, and a checklist whose progress saves in the browser.

## What it does

- **Checklist tracker** — tick trophies off; progress is stored in localStorage, with export (download JSON) and import.
- **Filters** — by kind (story, missable, collectibles, activities, character quests, robberies, misc), by grade, by earned / not yet earned, and free-text search.
- **Spoiler setting** — hides the names and descriptions of story and hidden trophies until they are earned.
- **Guide pane** — click any trophy to read its guide, its official description, its PSN count target where one exists, and its source (PowerPyx, GTABase or PSNProfiles), plus a per-trophy note field.
- **Roadmap** — Stage 1 story (60–80 h), Stage 2 100% checklist + 70 of 80 challenges (~100 h), Stage 3 Strangers & Freaks + cleanup (~10 h), each with its own progress bar, plus a Next-up planner listing the next trophies in roadmap order.
- **Missables** — the one possibly missable trophy (Positive Mental Attitude, Chapter 1 balcony meditation) with an honest note that it is not yet confirmed whether that meditation is required, the manual-save plan (15 slots), and the statement that no other trophy is missable.

## Facts and honesty

- 55 trophies: 1 platinum, 2 gold, 6 silver, 46 bronze; 28 hidden; 0 online; difficulty 4/10; ~200 hours; hardest trophy A Long Road (100% completion).
- Five trophies (In The Beginning…, Capital Offense, Bad Luck I Guess, The Truth Is Out There, Ten Pin) are labelled **not yet confirmed** — their unlock methods were unknown at launch (19 Nov 2026) and no steps are claimed as fact.
- Sources: [PowerPyx — GTA 6 Trophy Guide & Roadmap](https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/), [GTABase — GTA 6 Trophy Guide & Achievements List](https://www.gtabase.com/articles/gta-6/gta-6-achievements-trophies-list-ps5-xbox-series), [PSNProfiles — GTA VI Trophies](https://psnprofiles.com/trophies/43531-grand-theft-auto-vi).

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network requests, no images, system fonts only. `main.ts` hands the entry in: it copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` (outside the grader, `MAKEFUN_OUTPUT_DIR=out node main.ts`).

## License

MIT — see `LICENSE`.
