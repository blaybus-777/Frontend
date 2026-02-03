# 📂 Folder Structure

프로젝트는 **관심사 분리**를 기준으로 폴더를 구성합니다.

---

## 🗂 디렉토리 구조

```text
src/
├── apis/          # API 호출 로직 및 Axios 인스턴스
├── assets/        # 이미지, 폰트, SVG 등 정적 리소스
├── components/    # 공통 UI 컴포넌트
├── hooks/         # 재사용 가능한 커스텀 훅
├── pages/         # 라우트 단위 페이지 컴포넌트
├── routes/        # 라우터 설정
├── stores/        # 전역 상태 관리
├── types/         # 공용 TypeScript 타입
├── App.tsx
└── main.tsx
```

---

## 📌 설계 원칙

- `components`에는 **비즈니스 로직을 포함하지 않습니다.**
- 페이지 단위의 로직은 `pages`에 위치합니다.
- 전역으로 사용되는 타입만 `types`에 정의합니다.
