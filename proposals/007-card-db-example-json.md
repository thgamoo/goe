# Proposal 007: Card DB Example JSON

## Goal

Add example cards to the `카드 DB` tab using JSON-managed data, while aligning card fields with the card composition rules already defined for `괴이전`.

## Confirmed Decisions

1. Rules versions should be consolidated back into a single `v0.1`.
2. Current `v0.1`, `v0.2`, and the deck-size/card-limit changes should be merged into `docs/rules/v0.1.md`.
3. `징집소` should become a 20-card soldier deck.
4. The same soldier card can be included up to 2 copies.
5. Create about 15 soldier card types.
6. `전략` remains a 20-card operation deck.
7. The same operation card can be included up to 3 copies.
8. Create about 10 operation card types.
9. Create 2 general cards.
10. Card names, abilities, movement, power, factions, and examples can be drafted by Codex.
11. Existing `grns-card` data should be used as a reference for faction/class tone and field style.
12. Card DB screen only needs card type display and filters for now.
13. Serial format should be `[레어도]-[카드종류][시리얼넘버세자리]`, e.g. `R-S001`.

## Existing `grns-card` Data Reference

The latest local reference data inspected is under:

```text
../data/card-2026-06-01-v1/
```

Relevant patterns:

- Class/faction IDs:
  - `ym`: 예맥 · 개마무사
  - `sr`: 사로국 · 이매망량
  - `gr`: 가락 · 야철장
  - `sj`: 십제 · 주혼귀사
  - `ne`: 중립
- Common fields:
  - `name`
  - `faction`
  - `classId`
  - `className`
  - `theme`
  - `type`
  - `race`
  - `effect`
  - `lore`
  - `power`
  - `serial`
  - `sigil`
  - `illustration`

`괴이전` should reference the faction/class tone, but use its own card-type schema.

## Proposed Data File

Create:

```text
src/data/cards.json
```

Use this top-level shape:

```json
{
  "rules": {
    "soldierDeckSize": 20,
    "soldierCopyLimit": 2,
    "operationDeckSize": 20,
    "operationCopyLimit": 3,
    "generalLimit": 1
  },
  "soldiers": [],
  "generals": [],
  "operations": []
}
```

## Proposed Card Fields

### Soldier

```json
{
  "id": "soldier-saro-shield-line",
  "cardType": "soldier",
  "name": "사로 방패진",
  "rarity": "C",
  "serial": "C-S001",
  "faction": "사로국",
  "classId": "sr",
  "className": "이매망량",
  "species": "인간",
  "movement": "상하좌우 1",
  "capacity": 2,
  "attackInfluence": "상하좌우 1",
  "effect": "주둔 중이면 이 병사와 이웃한 아군 병사는 첫 처치 효과를 1회 무시한다.",
  "flavor": "무너지는 문 앞에서 가장 오래 버티는 자들.",
  "sigil": "盾"
}
```

### General

```json
{
  "id": "general-saro-gate-captain",
  "cardType": "general",
  "name": "성문장 한솔",
  "rarity": "R",
  "serial": "R-G001",
  "faction": "사로국",
  "classId": "sr",
  "className": "이매망량",
  "species": "인간",
  "effect": "국면마다 1회, 출정한 병사 1장을 정비 상태로 만들고 그 병사가 주둔한 칸의 점령을 유지한다.",
  "flavor": "성문은 닫히는 법보다 열리는 법이 더 중요하다.",
  "sigil": "將"
}
```

### Operation

```json
{
  "id": "operation-sudden-raid",
  "cardType": "operation",
  "name": "급습",
  "rarity": "C",
  "serial": "C-O001",
  "powerCost": 1,
  "timing": "교전",
  "effect": "상대가 정비 상태라면 상대 참여 병사 1장을 지정한다. 이번 교전 동안 그 병사는 작전 카드의 방어 효과를 받을 수 없다.",
  "flavor": "쉬는 숨을 노리는 칼끝.",
  "sigil": "襲"
}
```

## Proposed Example Counts

- Soldiers: 15
- Generals: 2
- Operations: 10

## Proposed UI Changes

1. Replace current placeholder card type panels with JSON-driven card data.
2. Add card type filters:
   - 전체
   - 병사
   - 장군
   - 작전
3. Show card count by current filter.
4. Render:
   - Soldier and operation cards as vertical cards.
   - General cards as horizontal cards.
5. Show the serial using the new format.

## Proposed Rules Changes

1. Replace `docs/rules/v0.1.md` with a consolidated Korean rules document.
2. Remove `docs/rules/v0.2.md`.
3. Update deck construction:
   - `징집소`: 20 cards, same soldier up to 2 copies.
   - `전략`: 20 cards, same operation up to 3 copies.
   - `장군`: 1 selected general, with 2 example general cards in DB.
4. Update README links to point only to `docs/rules/v0.1.md`.

## Task Tracking

When approved:

1. Add task 6 to `task.csv` as `in_progress`.
2. Mark it `done` after implementation and verification.

## Verification

1. Run `pnpm lint`.
2. Run `pnpm build`.
3. Verify `/goe/cards` renders filters and JSON-driven example cards.

## Approval

Waiting for the user to say `go`.
