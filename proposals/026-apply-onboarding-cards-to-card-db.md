# Proposal 026: Apply Onboarding Cards To Card DB

## Status

Implemented.

## Context

The Card DB still contains older prototype cards mixed with newer onboarding-card work.

The user wants to:

- Apply the current minimal ink-paper frame direction to the actual card previews.
- Remove old card data that is not part of the onboarding set.
- Keep the onboarding cards being added now.

Current sources of truth:

- `docs/cards/onboarding/`
- `proposals/023-onboarding-card-documents.md`
- `proposals/025-fill-garak-sipje-onboarding-cards.md`
- `public/card-assets/common/goe-card-frame-minimal-v1.png`

Current `src/data/cards.json` sections:

- `soldiers`
- `generals`
- `operations`
- `weather`

## Goals

- Replace old prototype card entries in `src/data/cards.json` with onboarding-card entries only.
- Keep the new minimal frame path for soldier and operation/tool previews.
- Preserve the Card DB page behavior: filtering, card counts, previews, and print visibility.
- Keep onboarding card docs as the design source.
- Remove or ignore old non-onboarding example cards from the visible Card DB.

## Non-Goals

- Do not delete image assets yet unless the user explicitly asks.
- Do not redesign range UI or add `lucide-react` icons in this pass.
- Do not finalize every uncertain onboarding rule.
- Do not change the occupation-card print workflow.
- Do not remove weather cards unless the user confirms weather is not part of the onboarding Card DB yet.

## Proposed Data Shape

Use the existing `cards.json` shape where possible:

- Put onboarding unit cards in `soldiers`.
- Put onboarding generals in `generals`.
- Put onboarding tools and operation documents in `operations` for now, distinguished by `cardType`, `className`, `timing`, or keywords.
- Keep `frame` as `/goe/card-assets/common/goe-card-frame-minimal-v1.png` for vertical card previews.
- Use existing illustration placeholders until card-specific art exists.

## Expected Onboarding Set

From the current docs, expected entries include:

- Neutral soldiers: 궁병부대, 창병부대, 검병부대, 전차부대, 기마병
- Neutral tools: 낙하 구덩이, 밧줄 올가미, 뾰족한 짐승덫
- Neutral operation documents: 공격하라!, 퇴각하라!
- 예맥 cards: 개마무사, 용력잠식자, 정벌자 부대의 괴유, 길잡의 부대의 마로, 맛있는 맥고기, 광폭
- 사로 cards: 산도깨비, 물도깨비, 다파나국의 왕자, 유리, 도깨비지진, 머리잡이
- 가락 cards: 반파의 철소인, 비화의 철거미, 금관의 철거인, 소나갈질지, plus the filled 가락 tool/operation entries from proposal 025
- 십제 cards: entries from proposal 025 where defined

## Open Questions

- Resolved: keep `weather` cards in `src/data/cards.json`.
- Resolved: create a separate `tools` array instead of mixing tools into `operations`.
- Resolved: leave onboarding cards without illustration blank until final art exists.

## Check Before Implementation

Before changing `src/data/cards.json`, verify whether each class/faction onboarding deck reaches the intended 40-card composition.

Result:

- Intended onboarding deck formula is `common 30 + faction 10 = 40`.
- Common cards are neutral soldiers 15, neutral tools 9, neutral operation documents 6.
- Each faction/class needs faction-specific soldiers/generals 6 plus faction-specific tools/operation documents 4.
- 예맥 and 사로 have complete card-level docs for the 10 faction-specific cards.
- 가락 and 십제 have the intended 10-card structure, but their tool/operation and 십제 card-level docs are still partly represented by proposal notes instead of split card files.
- Current `src/data/cards.json` is not yet arranged as 40-card onboarding decks; it still contains old prototype entries mixed with newer onboarding-like entries.
- Implemented Card DB result: `soldiers 15`, `generals 6`, `operations 6`, `tools 7`, `weather 10`.
- Implemented deck check: common cards are 30 copies, and 예맥/사로국/가락/십제 each add 10 faction-specific copies for 40-card decks.

## Files Expected To Change After Approval

- `task.csv`
- `src/data/cards.json`
- `docs/project-sync.md`

Possibly:

- `src/App.tsx`
- `src/styles.css`

Only if the existing Card DB rendering needs a small adjustment for tools or missing art.

## Implementation Steps After Approval

1. Add a task row to `task.csv` and mark it `in_progress`.
2. Build the onboarding-only card list from the current docs/proposals.
3. Replace old non-onboarding card entries in `src/data/cards.json`.
4. Keep the minimal frame path on all relevant vertical cards.
5. Verify Card DB count, filters, and preview rendering.
6. Run `pnpm build` and `pnpm lint`.
7. Update `docs/project-sync.md`.
8. Mark the task `done`.

## Approval Needed

Approved by the user with "너 추천대로 하자" and implemented.

## Implementation Notes

- Rebuilt `src/data/cards.json` around onboarding card docs.
- Kept weather cards in the DB.
- Added a separate `tools` array.
- Removed old non-onboarding prototype soldier/general/operation entries from Card DB data.
- Left onboarding cards without illustration paths so previews render blank art panels.
- Removed missing weather illustration paths so broken images do not render.
