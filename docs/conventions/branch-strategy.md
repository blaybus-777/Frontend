# 🌿 Git 브랜치 전략

우리 프로젝트는 **Main → Develop → Feature** 구조를 따릅니다.

---

## 🔱 브랜치 종류

### `main`

- 실제 배포되는 **프로덕션 브랜치**
- 항상 안정적인 상태를 유지해야 합니다.

### `develop`

- 개발의 기준이 되는 브랜치
- 모든 기능 브랜치는 `develop`에서 생성됩니다.
- 버전 단위로 다음과 같이 관리합니다.

```text
develop-v1.0.0
develop-v1.0.1
```

---

## 🧩 작업 브랜치

모든 작업은 `develop` 브랜치에서 분기합니다.

### 기능 개발

```text
feature-{기능명}
예) feature-login
    feature-landing-pages
```

### 버그 수정

```text
fix-{이슈명}
예) fix-read-3d-object
```

---

## ❗ 주의사항

- `main` 브랜치에 직접 커밋 ❌
- PR 없이 병합 ❌
