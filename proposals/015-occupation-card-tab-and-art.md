# Proposal 015: Occupation Card Tab And Art Direction

## Status

Implemented.

## Context

The occupation marker direction is changing. Instead of representing occupation with flipped soldier cards, the game should use separate `점령 카드` cards.

The user described the product idea as a set of 25 double-sided cards, with different front and back faces and attractive illustrations. This can make occupation feel like a collectible physical component rather than a temporary board state.

The user clarified:

- All 25 occupation cards should use unique illustrations.
- The two sides are for 1P/2P ownership distinction.
- The `점령카드` tab should include printable card previews like the existing card DB.

Initial illustration concepts were generated as direction samples:

1. A berserker with red glowing eyes, arms spread wide, laughing madly.
2. A central single-horned dokkaebi woman sitting cross-legged on a throne, with a green overall mood.
3. A tentacled steel giant with blue energy and molten metal.
4. A beautiful slit-mouthed ghost with purple liquid energy, holding a falling village in her hand.

## Goals

- Add a new website tab for `점령카드`.
- Explain the occupation-card product idea clearly: 25 double-sided cards for the 5x5 battlefield.
- Start a dedicated visual language for occupation cards that is separate from soldier, general, and operation cards.
- Create or reserve data structure space for occupation card entries if needed.
- Save selected illustration assets into the project before wiring them into the site.
- Include printable card previews, similar to the current card DB.

## Non-Goals

- Do not finalize all 25 occupation card illustrations in this pass, but structure the data so unique art can be added one by one.
- Do not define the full physical manufacturing layout yet.
- Do not replace the current card DB schema wholesale.
- Do not implement a clickable playtest tool in this pass.

## Proposed Tab Direction

Add `점령카드` as its own tab between `보드` and `카드 DB`.

The tab should show:

- A short explanation that occupation is shown with separate occupation cards.
- A 5x5 set concept: 25 cards, double-sided, front and back are different.
- Printable card previews similar to the existing card DB.
- A small gallery or preview area for generated occupation art.
- A note that these cards represent land control, not soldiers.
- A clear distinction that the two sides mark 1P and 2P ownership.

## Proposed Art Direction

Occupation cards should feel more like territory omens, battle scars, local myths, and factional claims than like ordinary units.

The current concept subjects can become example occupation illustrations:

- `광소하는 광전사`: red eye glow, open-armed madness, battlefield omen.
- `옥좌의 외뿔 도깨비 여인`: green throne-room mood, smug dominance, conquered court atmosphere.
- `촉수 강철거인`: blue furnace glow, molten metal, multi-limbed or two-headed steel colossus.
- `보랏빛 손아귀 귀신`: slit-mouth ghost, liquid purple aura, village falling into her hand.

The card set should probably mix:

- Characters as symbolic rulers or occupiers.
- Landscape aftermath scenes.
- Ritual objects, banners, ruins, gates, and haunted terrain.
- Front/back contrast for ownership, corruption, season, or factional claim.

## Open Questions

1. Should each occupation card have different 1P and 2P illustrations, or should each card use one illustration with different 1P/2P frames?
2. Should occupation cards use the existing standard card frame, a new occupation-only frame, or no frame for now?
3. Should the first generated images be saved as project assets now, or treated as disposable concept previews until a tighter art pass?

## Files Expected To Change After Approval

- `src/App.tsx`
- `src/data/occupation-cards.json` or an equivalent local data file, if the tab needs structured entries.
- `public/card-assets/occupation/` or `src/assets/occupation/` for selected generated art.
- `task.csv`
- `docs/project-sync.md`

## Implementation Steps After Approval

1. Add a task row to `task.csv`.
2. Save selected generated illustration files into the project with stable names.
3. Add a `점령카드` tab and route.
4. Build the first gallery/preview view.
5. Update the sync note with the new occupation-card direction.
6. Run the build or equivalent `tsc -b` and `vite build` verification.

## Approval Needed

Wait for the user to say `go` before implementation.
