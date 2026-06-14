# Proposal 004: Version Rules And Rename To 괴이전

## Goal

Apply the game title `괴이전` and convert the rules documentation from a single `core-rules.md` draft into explicit versioned Korean rule documents.

## Confirmed Decisions

1. The game title should be `괴이전`.
2. The rename should be handled together with the rules versioning work.
3. Do not keep `docs/rules/README.md` unless it provides meaningful content.
4. Convert rules documentation to Korean.
5. Move the current `docs/core-rules.md` content into `docs/rules/v0.1.md`.
6. Create `docs/rules/v0.2.md` with the newly clarified rules.
7. `점령` and `주둔` should be separate terms.
8. A 국면 changes every time a 교전 ends.
9. Weather and terrain changes should exist as an empty section for later refinement.

## Newly Confirmed Rule Clarifications

1. 성 is not counted as occupied land.
2. Players share one battlefield.
3. Each player starts from their own center castle.
4. Occupation is maintained by a soldier staying on the occupied cell.
5. A soldier cannot leave an occupied cell unless it gives up garrisoning.
6. Deployment places the soldier card face-up on the board.
7. Deployment is allowed only into the player's influence area.
8. After every engagement ends, the 국면 changes.
9. Each 국면 may later include weather or terrain changes.
10. Additional actions from general abilities should be grouped under `그 외` for now.
11. Unused operation cards can be placed at the bottom of the strategy deck in any order.
12. Combat participants include the attacker, the target, adjacent soldiers on both sides, and any units added through operation effects such as `증원`.
13. Generals normally do not participate in combat, but exception conditions may exist later.

## Proposed File Changes

### Rename

- Update `index.html` title and metadata to use `괴이전`.
- Update `src/App.tsx` hero title and relevant visible copy.
- Update `README.md` title.
- Keep `package.json` name as `grns-new-game` for repository stability.

### Rules

- Create `docs/rules/`.
- Move/rewrite the current English `docs/core-rules.md` content into Korean as `docs/rules/v0.1.md`.
- Create `docs/rules/v0.2.md` as the current working rules document.
- Delete `docs/core-rules.md`.
- Do not create `docs/rules/README.md` unless later needed.

### Task Tracking

- Add a `task.csv` row for this combined rename and rules-versioning task.
- Mark it `in_progress` when implementation starts and `done` after verification.

## Proposed `v0.2` Structure

1. 문서 정보
2. 게임 개요
3. 구성물
4. 보드판
5. 핵심 용어
6. 승리 조건
7. 시작 세팅
8. 국면과 차례
9. 명령
10. 영향권, 주둔, 점령
11. 카드 종류
12. 덱 구성
13. 전투
14. 교전
15. 전멸, 항복, 퇴각
16. 국면 변화
17. 날씨와 지형
18. 그 외
19. 미정 사항

## Verification

After implementation:

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Check `git status`.

## Approval

Waiting for the user to say `go`.
