# Proposal 013: GitHub Pages pnpm Setup Fix

## 문제

GitHub Pages workflow에서 다음 오류가 발생한다.

```text
Error: Unable to locate executable file: pnpm.
```

## 원인

`actions/setup-node`의 `cache: pnpm` 설정이 실행될 때 GitHub runner의 PATH에 `pnpm` 실행 파일이 아직 없다. 현재 workflow는 `corepack enable`을 `setup-node` 이후에 실행하므로, setup-node가 pnpm 캐시 준비 중 pnpm을 찾지 못할 수 있다.

## 수정 방향

- `pnpm/action-setup@v4`를 `actions/setup-node@v4`보다 먼저 실행한다.
- `packageManager`에 선언된 pnpm 버전과 맞춰 `version: 10.0.0`을 사용한다.
- `corepack enable` 단계는 제거한다.
- 이후 `setup-node`에서 `cache: pnpm`과 `cache-dependency-path: pnpm-lock.yaml`을 유지한다.

## 적용 파일

- `.github/workflows/deploy-pages.yml`

## 검증

- workflow YAML 구조 확인
- 로컬 `pnpm build` 통과 여부 확인

Created at: 2026-06-14 22:16:55 +0900
