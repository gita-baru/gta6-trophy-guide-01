# Leonida Platinum — GTA 6 trophy guide

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/gita-baru/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/gita-baru/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

A complete trophy guide for **Grand Theft Auto VI** (PlayStation 5): all **55 official trophies** — 1 platinum, 2 gold, 6 silver, 46 bronze — each with an original guide in plain words: what to do, where in Leonida, and when it can be missed. Every trophy cites its source.

## What you get

- **Tracker** — tick trophies off as you earn them; progress is saved in your browser (localStorage) and survives a reload. Export it as JSON and import it on another machine.
- **Filters** — by grade (platinum / gold / silver / bronze), by kind (story / missable / collectible / activity), by missable-only, and by text search.
- **Spoiler toggle** — story-trophy details stay hidden until you earn the trophy, so the guide never ruins a mission for you.
- **Roadmap to the platinum** — eight ordered steps: story first, the missable partner and one-off moments while they are still open, then stranger strands, collectibles, activities, and the money mop-up.
- **8 missables flagged** — each with exactly when it can be missed (Cal's fishing challenge, Bret's unique-animal hunt, the two partner trophies, the partnership moment, the big story choice, the second-try moment, and the strange night event).

## How to use it

Serve it locally and open it in a browser:

```sh
node serve.ts
# then open http://localhost:8080
```

Or just open `app/index.html` — it is plain static files (HTML, CSS, JS, JSON), no build step, no network loads, fully offline. `main.ts` packages `app/` and `screenshots/` into an output directory with a `dossier.json` for the make.fun grader:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

| File | What it is |
| --- | --- |
| `app/index.html` | The tracker page: progress bar, filters, roadmap, trophy list |
| `app/style.css` | The dusk-on-Ocean-Drive look (no images, no web fonts) |
| `app/app.js` | Tracker logic: checklist, filters, spoilers, export/import |
| `app/data/trophies.json` | All 55 trophies: name, description, grade, kind, guide, source, missable flag |
| `screenshots/` | 4 screenshots of the guide (1280×800 JPEG) |
| `trophy-data-brief.md` | How the trophy data was sourced and checked |
| `VARIANTS.md` | Design choices behind this version |

## Sources

Trophy names, descriptions and grades are the official 55-trophy list. Guide text is original. Each trophy cites one of: PowerPyx, PlayStationTrophies.org, PSNProfiles, TrueTrophies, Exophase. See `trophy-data-brief.md` for the sourcing notes. No Rockstar artwork or logos are used anywhere in this guide.

## License

MIT — see [LICENSE](LICENSE).
