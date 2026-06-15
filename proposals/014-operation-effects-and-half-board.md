# Proposal 014: Operation Effects And Half Board Pass

## Status

Proposed.

## Context

The next useful work should avoid locking the full rules engine too early. The user confirmed that minimum playable rules and engagement resource details can wait, but asked to proceed with:

1. Reworking operation card effects so the current operation names feel intentional.
2. Updating the board screen from a full 5x5 view to a 2.5x5 player-side view.

The tutorial should remain downstream of rules stabilization.

The user later clarified three foundational directions:

- The castle is outside the 5x5 battlefield. It is a square cell attached just outside the middle edge.
- An operation card's printed `힘 비용` is paid by spending the `역량` of participating soldiers.
- The larger project goal is to complete the prototype rules, using a clickable web playtest tool as the foundation.

## Goals

- Make the current 10 operation cards read like a coherent early test set.
- Keep operation effects compatible with the existing rough engagement model without solving every deferred rules question.
- Change the board tab to show a player-side battlefield section: 2.5 rows by 5 columns.
- Place a square `성` cell outside the 5x5 battlefield, directly attached below the center-bottom square of that player-side board.
- Keep the website structure and styling consistent with the current Vite/React page.

## Non-Goals

- Do not finalize the castle rules yet.
- Do not fully balance operation card cost payment yet, but use the clarified model that `힘 비용` spends participating soldiers' `역량`.
- Do not create a full playable rules engine.
- Do not write the final tutorial yet.
- Do not redesign the whole site or card frame system.

## Proposed Operation Card Direction

The operation cards should be rewritten as a testable spread of engagement verbs:

- `그림자 함정`: restricts or exposes an opposing participant.
- `북천 돌파령`: reinforces from a nearby position.
- `철갑 전열`: protects against a defeat or removal effect.
- `퇴각하라`: loses by retreat while preserving future tempo.
- `왕명 사칭`: disrupts the opponent's unused operation cards.
- `쇠사슬 봉기`: marks or binds a target for later removal.
- `도깨비 몰락 방울`: defensive deck/hand manipulation.
- `좌우전이`: swaps or moves combat value between allied participants.
- `분노의 역습`: rewards being behind or recently damaged.
- `패태자의 전략`: controlled surrender with a small compensation.

Because cost balance is still early, effects should avoid relying on precise resource-spend timing beyond the basic model: operation cards spend `역량` from participating soldiers to pay their printed `힘 비용`.

## Proposed Board Screen Direction

Replace the current 5x5 board illustration in the Board tab with a more faithful player-side diagram:

- Show 5 columns.
- Show 2 full rows plus a top half-row, visually representing `2.5x5`.
- Put the `성` square directly below the center cell of the lower full row, outside the battlefield but touching the middle edge.
- Use labels sparingly: starting influence, contested field, occupied land, and castle.
- Keep the existing concept art below or beside the diagram only if it still helps the page.

## Files Expected To Change After Approval

- `src/data/cards.json`
- `src/App.tsx`
- Possibly `docs/project-sync.md` if the handoff note should reflect the new state.
- Possibly `task.csv` once implementation starts.

## Implementation Steps After Approval

1. Add a `task.csv` row for this approved work.
2. Rewrite the 10 operation card effect texts in `src/data/cards.json`.
3. Update the `BoardPage` component to render a 2.5x5 player-side board and a centered castle cell underneath.
4. Run the project build or type check with `pnpm`.
5. Update the sync note if the implemented state materially changes the project handoff.

## Approval Needed

Wait for the user to say `go` before implementation.
