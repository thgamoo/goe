# Proposal 039: 룰 페이지 온보딩 구조 개편

## Context

The user wants the `룰` page to use the structure of the existing GRNS card rules page as a reference:

- Reference URL: https://thgamoo.github.io/grns-card/rules
- The reference page is a SPA under `https://thgamoo.github.io/grns-card/`.
- Its rule experience includes a summarized rules page, a full rulebook reader, card layout notes, setup, turn phases, combat handling, keyword/glossary sections, field links, tutorial links, and Card DB keyword navigation.

Current `괴이전` rules are different from the referenced card game and should not copy the old rules directly.

Important current `괴이전` concepts:

- The game goal is occupying at least half of the 5x5 battlefield.
- Players reveal a grand general and start from their castle.
- Players choose 3 weather cards each, then perform `기우제` by rock-paper-scissors to determine the weather flow.
- `교전` is a battlefield state, not a separate phase.
- `국면` changes when an engagement ends.
- Weather should be introduced during setup as ritual/flow, then explained again when the first phase change happens.
- The user prefers the previous facedown reserve concept to feel like a messenger/resource instruction: facedown cards mean "send messengers to call more from the base next time."
- Because `명령` is already the grand general ability term, the facedown reserve action should use the distinct official term `전령`.

## Clarifying Questions

1. Resolved: rename the facedown future-supply action to `전령`.
2. Resolved: use the reference site's approachable rule-page temperature.
3. Resolved: place `기우제` in `전쟁 준비`.
4. Resolved: update the visible `룰` page and the supporting rule/sync/card terminology docs together.

## Proposed Rules Page Elements

### 1. Quick Rule Spine

Place this at the top as the beginner-safe path:

1. `목표`: 5x5 전장에서 절반 이상을 점령하면 승리한다.
2. `전쟁 준비`: 대장군 공개, 성 위치 확인, 기지 준비.
3. `기우제`: 각자 날씨 3장을 내고 가위바위보로 날씨 흐름을 정한다.
4. `차례`: 보급, 카드 사용, 출정/이동/전투, 전령.
5. `점령`: 병사가 주둔하면 그 칸을 점령한다.
6. `전투`: 공격범위 안의 상대 병사 하나와 싸운다.
7. `교전`: 여러 전투 카드가 공격범위로 얽힌 전장 상태다.
8. `국면 전환`: 교전이 끝나면 국면이 바뀌고 날씨가 바뀐다.

### 2. Setup / 기우제 Section

Explain setup before turn flow:

- 대장군 1장을 공개한다.
- 각자 기지 40장을 준비한다.
- 각자 날씨 3장을 선택한다.
- 가위바위보로 기우제를 지낸다.
- 기우제 결과로 첫 날씨 흐름을 정한다.
- 온보딩에서는 날씨 효과를 모두 설명하지 않고, "국면이 바뀔 때 다시 본다"로 둔다.

### 3. Turn Flow Cards

Replace the current four basic action cards with a more teachable sequence:

- `보급`: 차례 시작에 기지에서 4장을 군영으로 가져온다.
- `사용`: 병사, 도구, 작전 문서를 사용할 수 있다.
- `출정`: 병사를 영향권에 배치한다.
- `이동`: 병사가 이동 범위 안으로 움직인다.
- `전투`: 공격범위 안의 상대 병사를 지정한다.
- `전령`: 지금 쓰지 않는 카드를 덮어 다음 차례 추가 보급을 지시한다.

### 4. Board / Occupation Section

Add a compact board-linked explanation:

- 성은 시작 영향권의 기준이다.
- 성은 점령지로 세지 않는다.
- 병사가 남아 있으면 주둔한다.
- 주둔 중인 칸은 점령된다.
- 이동하려면 주둔을 포기한다.

### 5. Combat / Engagement Section

Keep this concise for first play:

- 전투 is one unit-vs-unit fight.
- 공격 선언 후 반응 작전을 처리할 수 있다.
- 전투 결과로 공격범위가 얽히면 교전 상태가 된다.
- 교전은 phase가 아니라 board state다.
- 교전 종료 시 승리 보상, 국면 전환, 날씨 전환을 확인한다.

### 6. Card Layout Section

Borrow the reference page's card-layout idea, but map it to `괴이전`:

- 이동 범위
- 카드명
- 병력
- 용모파기
- 능력
- 종족 및 진영
- 엠블럼
- 레어도 및 시리얼

This section should link visually to the Card DB sample card.

### 7. Keyword / Glossary Section

Add a rules term area similar to the reference site:

- `국면`
- `차례`
- `기지`
- `군영`
- `전령`
- `영향권`
- `주둔`
- `점령`
- `전투`
- `교전`
- `명령`
- `기우제`
- `날씨`
- `매장지`
- `단말마`
- `자폭`

Keywords should later navigate to filtered Card DB results where possible.

### 8. Full Rulebook Reader

Optional, depending on approval:

- Add a collapsible "전체 룰북" section.
- Source can be `docs/rules/v0.1.md`.
- This mirrors the reference page's rulebook reader without duplicating rule text manually.

### 9. Beginner Route Links

Add clear links/buttons:

- `튜토리얼 시작`
- `보드 보기`
- `카드 DB 보기`
- `전체 룰북 보기`

## Proposed Copy Draft

### Top Summary

괴이전은 5x5 전장에서 병사를 출정시켜 땅을 점령하는 보드/카드 게임이다. 병사가 칸에 남아 주둔하면 그 칸은 내 땅이 되고, 전장의 절반 이상을 점령하면 승리한다.

### Setup

전쟁을 시작하기 전에 각 플레이어는 대장군을 공개하고, 기지 40장을 준비한다. 그다음 각자 원하는 날씨 3장을 내고 가위바위보로 기우제를 지낸다. 기우제는 이번 전장의 날씨 흐름을 정하는 절차다. 첫 설명에서는 날씨 효과를 모두 외우지 않아도 된다. 교전이 끝나 국면이 바뀔 때, 지금 적용될 날씨만 확인하면 된다.

### Future Supply Action

이번 차례에 쓰지 않을 카드는 버리는 대신 덮어둘 수 있다. 덮어둔 카드는 다음 차례에 기지에서 더 불러오라는 지시가 된다. 다음 차례 시작 시 덮어둔 장수만큼 추가 보급을 받은 뒤, 덮어둔 카드는 원하는 순서로 기지 아래에 놓는다.

`전령`은 지금 쓰지 않는 카드를 뒷면으로 보내고, 다음 차례에 그 수만큼 기지에서 더 불러오는 행동이다.

## Implementation Plan After Approval

1. Add a task row to `task.csv` with status `in_progress`.
2. Update `src/App.tsx` rules-page data structures and visible copy.
3. Add or adjust small UI sections for quick flow, setup/weather, turn flow, combat, terms, and links.
4. If approved, update terminology in `docs/rules/v0.1.md` and `docs/project-sync.md`.
5. Run `pnpm` verification/build command used by the project.
6. Start or reuse the local dev server and inspect the page in browser if frontend changes are made.
7. Update `task.csv` status to `done`.

## Non-Goals

- Do not copy the old GRNS card rules into `괴이전`.
- Do not finalize all weather effects.
- Do not build a full rules engine.
- Do not change unrelated rules beyond the approved `전령`, `기우제`, and rules-page structure work.
