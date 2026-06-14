# Proposal 010: 카드 엠블럼과 위치 조정 가이드

## 목표

- 기존 GRNS 자료의 진영 엠블럼 이미지를 카드 DB에 연결한다.
- 카드 하단 중앙에는 `sigil` 문자가 아니라 진영 엠블럼을 표시한다.
- 사용자가 직접 카드 텍스트 위치를 조정할 수 있도록 `src/App.tsx`의 조정 지점을 명확히 안내한다.

## 적용 범위

- `public/card-assets/emblems/`
- `src/data/cards.json`
- `src/App.tsx`
- `task.csv`

## 확인 사항

- 현재 자료에서 엠블럼 이미지는 `../docs/faction-diamonds/*-emblem.png`에 있다.
- 카드 데이터에는 표시용 필드를 `emblem`으로 둔다.
- 위치 조정은 CSS 파일이 아니라 `CardPreview` 내부 Tailwind `className`의 `left/top/right/bottom/h/w` 값을 바꾸는 방식으로 유지한다.
