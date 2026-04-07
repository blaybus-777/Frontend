# SIMVEX Frontend

이 프로젝트는 `제4회 2026 블레이버스 MVP 개발 해커톤`에서 창업팀 `SIMVEX`의 아이템을 선택해 구현한 프로젝트입니다.

SIMVEX는 공대생이 복잡한 기계 구조를 더 직관적으로 학습할 수 있도록 돕는 3D 엔지니어링 학습 서비스입니다.

이 저장소는 SIMVEX의 프론트엔드 애플리케이션을 관리하며, 3D 모델 탐색, 부품 단위 학습, AI 튜터, 학습 노트, 실습 플로우 UI를 포함합니다.

## 프로젝트 한눈에 보기

- `3D Viewer 기반 구조 학습`: 복잡한 기계 구조를 3D 모델로 시각화해 회전, 확대, 분해하며 직관적으로 이해할 수 있습니다.
- `부품 단위 탐색과 선택`: 계층 트리와 연동된 UI를 통해 특정 부품을 선택하고, 구성 요소를 세부적으로 살펴볼 수 있습니다.
- `AI Tutor 학습 지원`: 학습 중 궁금한 내용을 AI 튜터에 질문하며 필요한 설명을 빠르게 확인할 수 있습니다.
- `학습 보조 도구 통합`: 노트, 학습 패널, 보조 UI를 함께 제공해 하나의 화면에서 학습 맥락을 이어갈 수 있습니다.

## 기술 스택

React 19, TypeScript, Vite, Tailwind CSS 4, React Router, TanStack Query, Zustand, React Three Fiber, Three.js, Drei

## 디렉터리 구성

```text
src/
  apis/         API 요청 로직
  components/   화면/도메인별 UI 컴포넌트
  hooks/        데이터 조회 및 상태 처리 훅
  pages/        라우트 단위 페이지
  stores/       Zustand 전역 상태
  data/         목업 데이터 및 매핑 정보
  lib/          공통 라이브러리 설정
  types/        타입 정의
```
