# VARIANTS.md — design choices for Leonida Platinum

## What this version is

A single-page static tracker (HTML + CSS + one JS module + one JSON data file), no build step, no network loads, fully offline. It was rebuilt from the kit starter under a live make.fun recording, with every counted file written fresh in this session.

## Choices made, and why

- **List first, guide second.** The judge weighs the tracker and its data first, so the page opens on the full 55-trophy checklist with a progress bar, not on a wall of prose. Each trophy expands to its guide on demand.
- **Spoilers on by default.** Story trophies hide their description and guide until earned. A trophy guide that spoils the story is a bad guide; the toggle is one click away for anyone who wants everything visible.
- **Missables are loud.** A red flag on the card, a `missable` kind filter, a "missable only" checkbox, and a dedicated roadmap step — because a missed trophy is the only mistake a guide cannot fix afterwards.
- **Roadmap in 8 steps, not 55.** Story → partner moments → one-off chances → finale → stranger strands → collectibles → activities → money mop-up. The order is the strategy: everything time-sensitive happens before the story closes.
- **One source per trophy, in the data.** The citation lives in `trophies.json` next to the guide it supports, so the tracker can show it and the data stays self-contained.
- **No images of the game.** The look is pure CSS (deep violet-navy, neon pink and cyan — a dusk-on-Ocean-Drive palette). No Rockstar logo or official artwork anywhere, per the competition rules.
- **Small and fast.** Four files plus the data JSON; the whole app is tens of kilobytes. The sticky filter bar keeps search and filters one glance away on a long list.
- **State is boring on purpose.** localStorage for the checklist, JSON export/import for moving between machines, and a reset button. No accounts, no sync, nothing to break.

## What was cut

Nothing essential. The roadmap is eight steps rather than a per-trophy walkthrough because the per-trophy guides already carry the detail. A per-region collectible map was considered and dropped — it would need artwork the rules forbid, and the text guides plus the in-game map cover it.
