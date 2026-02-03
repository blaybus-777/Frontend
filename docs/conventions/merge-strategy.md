# 🔀 Merge 전략

우리 프로젝트는 깔끔한 커밋 히스토리 관리를 위해 **Squash and Merge** 전략을 기본으로 사용합니다.

---

## 🎯 Squash and Merge

### 규칙
- 모든 Pull Request(PR)는 **Squash and Merge** 방식으로 병합합니다.

### 목적
- **히스토리 단순화**: `main` 및 `develop` 브랜치의 커밋 로그를 깔끔하게 유지합니다.
- **의미 단위 보존**: 자잘한 작업 커밋(typo fix, wip 등)을 제거하고, 기능 단위의 커밋만 남깁니다.

---

## 🚫 Rebase 및 Merge Commit

- **Rebase and Merge**: 사용하지 않음 (커밋 해시 변경으로 인한 혼란 방지)
- **Create a Merge Commit**: 특별한 이유가 없는 한 사용하지 않음 (히스토리가 지저분해지는 것 방지)
