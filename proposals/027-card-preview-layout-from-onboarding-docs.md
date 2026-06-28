# Proposal 027: Card Preview Layout From Onboarding Docs

## Status

Implemented.

## Context

The Card DB now uses onboarding-card data, but the card preview still treats some old fields as if operation/tool cards could have a `powerCost`.

User corrections:

- `병력` is not a cost.
- Tools and operation documents should have no cost.
- Card layout should be driven by the per-card onboarding documents/data:
  - `장악범위`
  - `장악범위 사람 아이콘`
  - `공격범위`
  - `공격범위 사람 아이콘`
  - `병력`
  - `종족`
  - `레어도`
  - `시리얼번호`

Existing assets found:

- `public/card-assets/common/goe-card-frame-minimal-v1.png`
- `public/card-assets/common/goe-card-brush-label-v1.png`
- `public/card-assets/ranges/range-grid-frame.png`
- `public/card-assets/ranges/range-cell-control.png`
- `public/card-assets/ranges/range-cell-attack.png`
- `public/card-assets/ranges/range-person-marker-v1.png`

Missing as PNG assets:

- Right-top black `병력` circle.
- Bottom-left species placeholder.
- Bottom-right rarity/serial placeholder.

Recommendation: implement the missing UI pieces as React/CSS components instead of PNGs, because they contain dynamic text and should scale cleanly in Card DB and print.

## Goals

- Remove cost-like display logic from operation/tool cards.
- Stop using `powerCost` as a visible value for operation/tool cards.
- Keep `병력` only for cards that actually have `capacity`, such as soldiers/generals.
- Render card previews using reusable UI components:
  - title brush placeholder
  - control range 3x3 grid
  - attack range 3x3 grid
  - black `병력` circle
  - bottom-left species/type placeholder
  - bottom-right rarity/serial placeholder
- Use existing range PNG assets where helpful, but prefer components for dynamic state.
- Read range values from the current Card DB fields derived from onboarding docs.

## Non-Goals

- Do not generate final card illustrations.
- Do not add `lucide-react` range or arrow semantics in this pass.
- Do not change deck composition or 40-card validation.
- Do not remove weather cards.
- Do not redesign the minimal frame image itself.

## Proposed Rendering

For soldier/general cards:

- Top title: brush-label image or CSS brush panel with card name.
- Top-left: `장악범위` 3x3 mini grid.
- Top-right: `공격범위` 3x3 mini grid.
- Below top-right range: black circle with `병력`.
- Bottom-left: species/type text on a subtle underline.
- Bottom-right: rarity + serial.

For operation/tool cards:

- Top title remains.
- No `병력` circle unless the card has an actual `capacity`.
- No cost display.
- Range grids are hidden unless a card has range fields.
- Bottom-left shows `작전 문서` or `도구` / subtype.
- Bottom-right shows rarity + serial.

For weather cards:

- Keep current weather-oriented display unless a separate weather frame/layout is requested later.

## Open Questions

- Resolved: use `goe-card-brush-label-v1.png` through a reusable React component.
- Resolved: use the existing range PNG assets for grid frame, control cells, attack cells, and person marker.
- Superseded by proposal 028: ordinary general cards now render as vertical standard cards. Horizontal cards are reserved for a future `대장군` layout.

## Files Expected To Change After Approval

- `task.csv`
- `src/App.tsx`
- `src/data/cards.json`
- `docs/project-sync.md`

Possibly:

- `src/styles.css`

Only if the component styling is cleaner there than inline Tailwind classes.

## Implementation Steps After Approval

1. Add a task row to `task.csv` and mark it `in_progress`.
2. Remove operation/tool cost display and cost-style filtering.
3. Add reusable card preview components for range grids, title label, power circle, species placeholder, and rarity/serial placeholder.
4. Add data fields if needed for `controlIconPosition` and `attackIconPosition`, preserving existing `movement` and `attackInfluence` values.
5. Apply the layout to Card DB previews.
6. Verify Card DB rendering in browser, including tool/operation cards without cost.
7. Run `pnpm build` and `pnpm lint`.
8. Update sync docs and mark task `done`.

## Approval Needed

Approved by the user with `go` and implemented.

## Implementation Notes

- Removed cost-like `powerCost` usage from Card DB rendering and onboarding card data.
- Added `controlIconPosition` and `attackIconPosition` from card docs into `src/data/cards.json`.
- Added reusable React components for title brush, range grid, power circle, species line, and rarity/serial meta.
- Operation and tool cards no longer show a cost or power circle unless they have an actual `capacity`.
