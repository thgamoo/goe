# GRNS: Boundary Runners

GRNS IP를 바탕으로 새 형태의 게임을 실험하기 위한 독립 웹사이트 세팅입니다. 기존 `grns-card`의 Vite + React 구성을 참고하되, 다른 GitHub repository로 분리하기 쉽도록 이 폴더만으로 실행과 빌드가 가능하게 구성했습니다.

## 실행

```bash
pnpm install
pnpm dev
```

## 빌드

```bash
pnpm build
pnpm preview
```

## 규칙 문서

- [Core Game Rules Draft](./docs/core-rules.md)
- [Project Agent Rules Proposal](./proposals/001-project-agent-rules.md)
- [Core Game Rules Proposal](./proposals/002-core-game-rules.md)

## 다른 GitHub repo에 연결

이 폴더를 새 repo 루트로 사용할 때:

```bash
git init
git add .
git commit -m "Set up GRNS new game website"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

현재 상위 repo 안에서 작업 중이라면 `grns-new-game/` 폴더만 새 repository로 옮긴 뒤 위 명령을 실행하면 됩니다.
