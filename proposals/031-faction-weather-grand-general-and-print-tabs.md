# Proposal 031: Faction, Weather, Grand General, And Print Tab Cleanup

## Status

Implemented.

## Context

The current app has several cleanup items:

1. Faction naming:
   - Use `중립`, not `공통`, for normal common cards.
   - Weather cards should not have a faction.
2. Card DB keyword filter:
   - Keyword options should not include stale or noisy values.
3. Grand generals:
   - `대장군` card documents exist, but they are not represented in `src/data/cards.json`.
   - The Card DB has no way to view only grand generals.
   - Printing should support grand generals too.
4. Occupation/print tabs:
   - `점령카드` and `프린트` currently overlap.
   - The user wants to keep only the `점령카드` tab, while preserving the print behavior currently available under `프린트`.

Existing grand general docs:

- `docs/cards/onboarding/yemaek/grand-general-muhyul.md`
- `docs/cards/onboarding/saro/grand-general-talhae.md`
- `docs/cards/onboarding/garak/grand-general-gugan.md`
- `docs/cards/onboarding/sipje/grand-general-geongilji.md`

## Goals

- Change weather `faction` values to no faction/undefined.
- Ensure common non-weather cards use `중립`.
- Clean Card DB keyword filter values.
- Add `대장군` as a data-backed card type or display group.
- Add a Card DB filter/tab/control to view only 대장군 cards.
- Add print support for 대장군 cards.
- Remove the top-level `프린트` tab if approved.
- Move the existing occupation-card print flow into the `점령카드` tab so no print functionality is lost.

## Non-Goals

- Do not design the final visual frame for 대장군 beyond a usable initial preview/print layout.
- Do not change the 40-card onboarding deck composition.
- Do not remove weather cards.
- Do not change occupation-card image assets or counts.

## Proposed Data Direction

- Extend `CardType` with `grandGeneral`.
- Add a `grandGenerals` array to `src/data/cards.json`.
- Parse or manually encode the 4 existing 대장군 docs.
- Keep 대장군 separate from the 40-card deck count.
- Use `faction` for 대장군 because they are tied to 예맥/사로국/가락/십제.
- Set weather `faction` to undefined or omit it entirely.

## Proposed UI Direction

Card DB:

- Keep the existing type filter and add `대장군`.
- Optionally add a compact sub-filter/tab for `일반 카드 / 대장군` if needed.

Printing:

- Remove top-level `프린트` navigation.
- Put the existing front/back occupation-card print UI inside `점령카드`.
- Add a 대장군 print section/control either:
  - inside `카드 DB`, filtered to 대장군, or
  - inside `점령카드`/print area as a separate subsection.

## Decisions

1. Card DB gets a visible `일반 카드 / 대장군` subtab.
2. Grand generals print from Card DB while the `대장군` subtab is active.
3. Keyword filters keep only rules keywords: `출정`, `매복`, `보류`, `자폭`, `단말마`, `전투광`, `명령`.

## Implementation Notes

- Added `grandGenerals` data to `src/data/cards.json` from the 4 onboarding grand-general docs.
- Removed the top-level `프린트` navigation item.
- Moved the occupation-card front/back print workflow into the `점령카드` tab.
- Normalized non-weather common faction values to `중립`; weather cards now omit faction.
- Card DB filter options are derived from the active DB subtab so stale/noisy values do not appear.

## Files Changed

- `task.csv`
- `src/App.tsx`
- `src/data/cards.json`
- `docs/project-sync.md`
- `proposals/031-faction-weather-grand-general-and-print-tabs.md`

## Implementation Checklist

1. Done: Add a task row to `task.csv` and mark it `in_progress`.
2. Done: Normalize factions: use `중립`, remove weather faction values.
3. Done: Add `grandGeneral` / `대장군` data from the existing docs.
4. Done: Update Card DB filters/counts/rendering for 대장군.
5. Done: Clean keyword filter values according to the approved keyword policy.
6. Done: Remove top-level `프린트` tab and move print workflow into `점령카드`.
7. Done: Add 대장군 print support in the approved location.
8. Done: Run `pnpm build` and `pnpm lint`.
9. Done: Browser-check Card DB, 대장군 view, 점령카드 print, and route behavior.
10. Done: Update docs and mark task `done`.
