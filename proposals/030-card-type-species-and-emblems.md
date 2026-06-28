# Proposal 030: Card Type, Species, And Emblem Cleanup

## Status

Implemented.

## Context

Current Card DB previews still blur three separate concepts:

- Card type: 병사 / 도구 / 작전 / 장군 / 날씨
- Species: 철기 / 인간 / 귀신 / 도깨비 / 짐승
- Faction/class emblem: 예맥 / 사로국 / 가락 / 십제 / 공통

User corrections:

- `병사/도구/작전/장군/날씨` are card types.
- `철기/인간/귀신/도깨비` are species.
- Unspecified species should default to `인간`.
- `기마병` should be `인간/짐승`.
- Bottom-left label should show `타입 · 종족`.
- The bottom-center large hanja/sigil should be removed.
- Bottom-center should use the faction/class emblem instead.
- Weather cards do not need the black circle.
- Weather card bottom-left should say `날씨`, not `공통`.

## Current Asset Check

Existing emblem assets:

- `public/card-assets/emblems/yemaek-emblem.png`
- `public/card-assets/emblems/saro-emblem.png`
- `public/card-assets/emblems/garak-emblem.png`
- `public/card-assets/emblems/sipje-emblem.png`
- `public/card-assets/emblems/tu01-emblem.png`

No clearly named common emblem exists yet.

Decision: use `public/card-assets/emblems/tu01-emblem.png` as the common/neutral emblem for now.

## Goals

- Normalize Card DB data so `className` can represent card type/subtype and `species` represents actual species.
- Add or derive a display label like `병사 · 인간`, `병사 · 인간/짐승`, `도구`, `작전 문서`, `장군 · 귀신`, `날씨`.
- Default missing soldier/general species to `인간`.
- Set `기마병` species to `인간/짐승`.
- Remove the bottom-center hanja/sigil display from card previews.
- Render faction/common emblem in the bottom-center slot.
- Remove the weather black circle.
- Make weather bottom-left label show `날씨`.

## Non-Goals

- Do not create a full new emblem system.
- Do not redesign existing faction emblems.
- Do not change deck composition.
- Do not change weather-card rules.

## Open Questions

- Resolved: use existing `tu01-emblem.png` as the common/neutral emblem.
- Resolved: bottom-left labels for tools and operation documents show only card type, without subtype.
- Resolved: weather cards use the common emblem, including faction-specific weather cards.

## Files Expected To Change After Approval

- `task.csv`
- `src/data/cards.json`
- `src/App.tsx`
- `docs/project-sync.md`
- `proposals/030-card-type-species-and-emblems.md`

Possibly:

- `public/card-assets/emblems/common-emblem.png`

Only if the user wants a new common emblem.

## Implementation Steps After Approval

1. Add a task row to `task.csv` and mark it `in_progress`.
2. Normalize card species/type fields in `src/data/cards.json`.
3. Add emblem paths for faction/common cards.
4. Update `CardPreview` bottom-left label and bottom-center emblem rendering.
5. Remove weather black circle.
6. Run `pnpm build` and `pnpm lint`.
7. Browser-check card DB filters and representative card previews.
8. Update docs and mark task `done`.

## Approval Needed

Approved by the user with `go` and implemented.

## Implementation Notes

- Added `typeLabel` and `typeSpeciesLabel` to card data.
- Corrected soldier/general species values, including `기마병` as `인간/짐승`.
- Defaulted unspecified soldier/general species to `인간`.
- Set common/faction emblem paths on card data.
- Replaced bottom-center sigil fallback with emblem rendering.
- Removed the black weather circle.
