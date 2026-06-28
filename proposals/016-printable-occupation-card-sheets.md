# Proposal 016: Printable Occupation Card Sheets

## Status

Implemented.

## Context

The occupation cards need a print-focused workflow for hand-cut physical prototypes.

The current `점령카드` tab shows example occupation-card pairs, but the next goal is different: create a dedicated print area where the user can print 25 double-sided occupation cards at standard card dimensions.

The user clarified:

- The physical card size should be exactly `63mm x 88mm`.
- Cards should have no margins between them in the sheet layout, so cutting is easier.
- Printing should use 9 cards per page where possible.
- The cards are double-sided, but front and back sheets can be printed separately.
- The four existing occupation-card designs should be repeated until there are 25 occupation cards.
- Front and back faces should use different images.
- The print workflow should live under a new `프린트` top-level tab, with `점령카드` as a subtab inside it.

## Goals

- Add a top-level `프린트` tab to the site.
- Add a `점령카드` print subtab inside the print page.
- Generate a print layout for 25 occupation cards using the existing four occupation-card records.
- Render front-side sheets and back-side sheets separately.
- Use exact `63mm x 88mm` card boxes for print.
- Use a 9-card page layout, with the last page containing the remaining cards.
- Remove gaps and margins between cards inside the card grid.
- Keep the screen view understandable while making `@media print` prioritize precise output.

## Non-Goals

- Do not generate 21 new unique occupation-card illustrations in this pass.
- Do not define the final manufacturing bleed, safe area, or print-shop layout.
- Do not implement automatic duplex printer alignment.
- Do not change the core card DB schema.
- Do not remove the current `점령카드` gallery tab unless the user explicitly asks.

## Proposed Behavior

Add a `프린트` tab in the main navigation.

Inside the print page, provide subtabs or segmented controls:

- `점령카드`

For occupation-card printing, show:

- A front-side print section containing 25 cards.
- A back-side print section containing the matching 25 backs.
- Each section grouped into pages of 9 cards.
- Page 1: cards 1-9.
- Page 2: cards 10-18.
- Page 3: cards 19-25.

The 25-card set should be built by repeating the existing four designs in order until 25 card entries exist.

Example sequence:

1. 광소하는 광전사
2. 옥좌의 외뿔 도깨비
3. 청철 촉수거인
4. 보랏빛 손아귀 귀신
5. 광소하는 광전사

And so on until 25.

## Print Layout Direction

Each card face:

```text
width: 63mm
height: 88mm
```

Each printed page group:

- Grid: 3 columns x 3 rows.
- Gap: 0.
- Card margin: 0.
- Card border radius: 0 in print.
- Card shadow: none in print.
- Page break after every 9-card sheet.

Because `63mm x 3 = 189mm` and `88mm x 3 = 264mm`, this can fit within an A4 page in portrait orientation before printer hardware margins.

## Open Questions

1. Should the front sheets and back sheets appear one after another on the same print action, or should the user have separate buttons for `앞면 프린트` and `뒷면 프린트`?
2. Should the repeated cards display copy numbers such as `01/25`, or should the printable face remain pure image-only?
3. Should the screen UI include cut/order labels outside the print area, hidden during print?

## Files Expected To Change After Approval

- `src/App.tsx`
- `task.csv`
- `docs/project-sync.md`

Possibly:

- `src/styles.css` if the print-specific CSS becomes too large for component class names.

## Implementation Steps After Approval

1. Add a new task row to `task.csv` and mark it `in_progress`.
2. Add the `프린트` tab and route.
3. Build a print page with a `점령카드` subtab.
4. Generate 25 occupation-card print entries from the existing 4 designs.
5. Render front sheets and back sheets in 9-card pages.
6. Add exact print sizing for `63mm x 88mm` cards with no card gaps.
7. Update `docs/project-sync.md`.
8. Run build verification with `pnpm build` if dependencies are installed.
9. Mark the task `done` after verification.

## Approval Needed

Wait for the user to say `go` before implementation.
