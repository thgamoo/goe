# Proposal 035: Horizontal Grand General Card Frame

## Status

Implemented.

## Context

Grand general cards are currently data-backed as `cardType: "grandGeneral"`, but the Card DB still renders them through the standard vertical `CardPreview`. The user clarified that grand general cards should use a horizontal design.

The attached reference shows a wide card direction:

- Landscape card ratio, likely standard card rotated: `88mm x 63mm`.
- Large upper illustration area with ink-wash battlefield/general art.
- Long black brush title label near the upper-left.
- Small faction/leader banner or emblem area near the upper-right.
- Wide bottom text panel for the command effect.
- Bottom metadata area for type, emblem, rarity, and serial.

Existing relevant assets:

- `public/card-assets/common/goe-card-frame-minimal-v1.png`
- `public/card-assets/common/goe-card-brush-label-v1.png`
- `public/card-assets/reference/card-design.webp`
- `public/card-assets/emblems/*-emblem.png`

## Clarification Questions

1. Should the horizontal grand general card use the rotated standard size exactly, `88mm x 63mm`, for print output?
2. Should the first implementation keep the illustration area empty/placeholder like the current DB cards, or should I generate temporary ink-wash commander illustrations for the 4 grand generals now?
3. Should the horizontal frame PNG include only the paper/border/text-panel chrome with transparent art/title areas, or should the brush title mark be baked into the frame image?
4. For the top-right marker in the reference, should it show the faction emblem, a small faction banner, or nothing for now?
5. Should grand generals remain printable from the Card DB grid only, or should we also add a separate print layout tuned for horizontal cards?

## Proposed Direction

- Add a landscape frame asset, `public/card-assets/common/goe-grand-general-frame-v1.svg`.
- Keep the title brush as a reusable overlay/component rather than baking it into the frame, so the title can remain real text.
- Add a dedicated `GrandGeneralPreview` component.
- Route `card.cardType === "grandGeneral"` to `GrandGeneralPreview` from Card DB.
- Update grand general data to use the new landscape frame path and source-based landscape illustrations.
- Use landscape print dimensions for grand generals: `88mm x 63mm`.
- Keep regular cards untouched.

## Proposed Visual Layout

- Card root: `aspect-[88/63]`.
- Illustration/placeholder: upper band, roughly 72% of height.
- Title brush: upper-left, long horizontal label.
- Optional faction marker/emblem: upper-right.
- Effect text panel: lower band, spanning most width.
- Type label: lower-left.
- Emblem: lower-center or lower-right depending on final composition.
- Rarity/serial: lower-right.

## Files Expected To Change After Approval

- `task.csv`
- `src/App.tsx`
- `src/data/cards.json`
- `docs/project-sync.md`
- `proposals/035-horizontal-grand-general-card-frame.md`
- `public/card-assets/common/goe-grand-general-frame-v1.svg`
- `public/card-assets/grand-generals/*.png`
- Optional generated preview/check assets under `public/card-assets/common/` or `/private/tmp`

## Implementation Steps After Approval

1. Add task row to `task.csv` and mark it `in_progress`.
2. Generate or create the landscape grand general frame PNG.
3. Add `GrandGeneralPreview` in `src/App.tsx`.
4. Route grand general cards to the landscape preview.
5. Update grand general data frame paths.
6. Tune print sizing for `grandGeneral` cards.
7. Run `pnpm build` and `pnpm lint`.
8. Browser-check Card DB `대장군` subtab and print layout.
9. Update sync docs and mark task `done`.

## Approval Needed

Approved by the user and implemented.

## Implementation Notes

- Grand general cards now render through a dedicated landscape `GrandGeneralPreview` component.
- Print dimensions are set to `88mm x 63mm` for grand generals while regular cards keep the vertical card size.
- The title brush remains a reusable React overlay using real text.
- The top-right marker uses each card's faction emblem.
- The four grand general illustrations are generated from the user-provided original illustration files into white-background landscape PNG assets.
- The frame is a repository SVG asset rather than a Chromium-rendered PNG.
