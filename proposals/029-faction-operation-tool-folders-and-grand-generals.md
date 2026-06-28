# Proposal 029: 팩션별 도구/작전 문서 정리와 대장군 카드 추가

## 배경

현재 온보딩 카드 문서 중 팩션 특성 도구/작전 문서가 `docs/cards/onboarding/faction-tools-operations/` 한 폴더 안에 섞여 있다.

사용자는 병사 문서처럼 각 팩션 디렉토리 안으로 옮기길 원한다.

또한 기존 장군 카드는 다른 세션에서 세로형 카드로 바꾸고 있으며, 새로 가로형 디자인을 사용하는 `대장군` 카드를 만들 예정이다.

## 목표

1. `faction-tools-operations` 안의 팩션별 도구/작전 문서를 각 팩션 디렉토리로 옮긴다.
2. 온보딩 문서 링크를 새 위치에 맞게 갱신한다.
3. 새 카드 종류 `대장군`을 문서화한다.
4. 대장군 공통 룰을 룰북에 추가한다.
5. 예맥, 사로국, 가락, 십제 대장군 4종의 카드 문서를 만든다.

## 파일 이동 계획

현재:

```text
docs/cards/onboarding/faction-tools-operations/
  yemaek-frenzy.md
  yemaek-mac-meat.md
  saro-goblin-quake.md
  saro-head-grabber.md
  garak.md
  garak-overdrive.md
  garak-cloning-furnace.md
  sipje.md
  sipje-tomb-gate.md
  sipje-spirit-summoning.md
```

변경 후:

```text
docs/cards/onboarding/yemaek/
  yemaek-frenzy.md
  yemaek-mac-meat.md

docs/cards/onboarding/saro/
  saro-goblin-quake.md
  saro-head-grabber.md

docs/cards/onboarding/garak/
  garak-tools-operations.md
  garak-overdrive.md
  garak-cloning-furnace.md

docs/cards/onboarding/sipje/
  sipje-tools-operations.md
  sipje-tomb-gate.md
  sipje-spirit-summoning.md
```

`docs/cards/onboarding/faction-tools-operations/`는 비게 되면 제거한다.

## 대장군 공통 룰 초안

- `대장군`은 가로형으로 디자인되는 별도 카드 종류다.
- 대장군은 일종의 리더 카드다.
- 플레이어는 장군과 별도로 대장군 1장을 함께 사용한다.
- 기존 `장군` 카드는 세로형 카드로 다루며, 기지에 넣을 수 있는 카드다.
- 대장군은 일반적으로 필드에 나올 수 없다.
- 대장군은 한 차례에 한 번 `명령`을 사용할 수 있다.
- 대장군의 명령은 자기 차례에만 사용할 수 있다.
- 대장군이 전사하거나 매장지로 가는지 여부는 아직 별도 규칙이 없다.
- `명령`은 대장군 전용 용어로 둔다.
- 현재 룰북의 `기본 명령` 표현은 옛 표현이므로 `차례 행동`으로 바꾼다.

## 대장군 카드

### 예맥: 무신 무휼

- 카드 종류: 대장군
- 진영/클래스: 예맥
- 명령: 내 인간 1장을 지정한다. 이번 차례 `[전투광]`을 얻는다.

### 사로국: 탈해 이사금

- 카드 종류: 대장군
- 진영/클래스: 사로국
- 명령: 내 병사 1장을 지정한다. 이번 차례 해당 병사의 병력으로 `[보류]` 없이 `장악`할 수 있다.

### 가락: 구간

- 카드 종류: 대장군
- 진영/클래스: 가락
- 명령: 내 병사 1장을 지정한다. 해당 병사가 교전 중일 경우 `[교전]`을 종료한다. 그 후 국면을 전환한다.
- 처리: 이 효과로 종료된 교전은 무승부로 처리한다. 승패와 점령 포인트는 발생하지 않는다.

### 십제: 내려온 건길지

- 카드 종류: 대장군
- 진영/클래스: 십제
- 명령: 내 병사 1장을 지정한다. 해당 병사가 이번 차례에 전사할 경우 `[보류]`한다.
- 처리: 전사한 병사 카드를 보류한다.

## 확인 질문

확인 완료:

- `탈해 이사금`의 `<장악>` 표기는 `장악`으로 통일한다.
- `명령`은 대장군 전용 용어다.
- 기존 룰북의 `명령` 섹션은 `차례 행동`으로 바꾼다.

## 진행 방식

사용자가 `go`라고 말하면:

1. `task.csv`에 작업을 추가한다.
2. 팩션 특성 도구/작전 문서를 각 팩션 디렉토리로 이동한다.
3. 이동된 문서의 상대 링크를 수정한다.
4. 대장군 카드 문서 4개를 생성한다.
5. `docs/cards/onboarding/README.md`에 대장군과 새 위치를 반영한다.
6. `docs/rules/v0.1.md`에 대장군 공통 룰을 추가한다.
7. 문서 링크와 남은 기존 경로 참조를 검색한다.
