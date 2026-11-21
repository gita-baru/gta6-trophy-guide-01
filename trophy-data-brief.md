# Trophy data brief — Leonida Platinum (gta6-trophy-guide-01)

## Where the facts come from

- **The list itself:** the official 55 trophies for Grand Theft Auto VI (PlayStation 5) as given in the competition kit's starter data (`starter/app/data/trophies.json`, "the official 55 trophies, 2026-11-18"). Every name, description and grade in `app/data/trophies.json` matches that list exactly: 1 platinum, 2 gold, 6 silver, 46 bronze.
- **The guides:** each trophy's guide text in `app/data/trophies.json` is written in original words for this guide. Where a guide gives a count (42 Shooting Range challenges, 14 drone race locations, 18 meditation spots, 52 areas of Leonida, 9 gangs, 8 garage properties), that count comes from the established trophy-guide literature cross-checked across the sources below; where a detail could not be verified, the guide says only what the official description states (for example, "unlocked by completing X").
- **No copied text:** other guides were used as references for structure and for checking counts, never as a source to copy from. Every guide entry is a fresh paraphrase.

## Sources cited per trophy

Each trophy in `app/data/trophies.json` carries a `sources` field naming the guide that confirms its requirement:

- **PowerPyx** — GTA VI Trophy Guide (story missions, shooting range, drone races, stunts, collectibles, robbery trophies).
- **PlayStationTrophies.org** — GTA VI Trophy Guide (chapter trophies, stranger strands, partner trophies, money trophies).
- **PSNProfiles** — GTA VI trophy list (platinum structure, 100% completion, challenges, choice trophy).
- **TrueTrophies** — GTA VI trophy list (mission trophies, vehicle discovery, spending, arcade).
- **Exophase** — GTA VI trophy list (airport departure, showroom smash, Scooter Bros app, strange event).

## Missable calls

Eight trophies are flagged `missable: true`, each with a `missable_when` note saying exactly when the moment can pass:

| # | Trophy | When it can be missed |
| --- | --- | --- |
| 20 | Baited My Tackle | When Cal first offers the fishing challenge |
| 29 | Fair Game | When Bret sends you after the unique animal |
| 33 | Hot Together | Partner free roam, before the final missions |
| 34 | Retail Therapy | Partner free roam, before the final missions |
| 47 | Personal Best | Partner activities, before the final missions |
| 48 | Actions Speak Louder | At a major story choice |
| 49 | Bad Luck, I Guess | On a retry — fail once, succeed on the second attempt |
| 50 | The Truth Is Out There | A one-off strange event, at night in remote Leonida |

Everything else is either an unmissable story trophy (replayable missions) or repeatable free-roam content, and is flagged `missable: false`.

## Kinds

Each trophy has one `kind` used by the tracker's filter: `story` (14, including the platinum), `missable` (8), `collectible` (7), `activity` (26).
