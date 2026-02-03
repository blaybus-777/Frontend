# 📝 Commit Message Convention

커밋 메시지는 프로젝트의 변경 이력을 설명하는 중요한 기록입니다.
본 프로젝트는 **Angular Git Commit Message Conventions**를 따릅니다.

---

## 📌 커밋 메시지 형식

```text
<type>: <subject>
```

### 예시

```text
feat: 랜딩 페이지 구현
fix: 로그인 오류 수정
```

---

## 🏷 Type 목록

| Type     | 설명                           |
| -------- | ------------------------------ |
| feat     | 새로운 기능 추가               |
| fix      | 버그 수정                      |
| docs     | 문서 수정                      |
| style    | 코드 포맷팅 (로직 변경 없음)   |
| refactor | 코드 리팩토링                  |
| test     | 테스트 코드 추가/수정          |
| chore    | 빌드, 패키지 설정 등 기타 작업 |

---

## ✍️ 작성 규칙

- subject는 **명령문 형태**로 작성합니다.
- 마침표(`.`)를 사용하지 않습니다.
- 한글/영문 모두 허용하되 팀 내에서 일관성을 유지합니다.

---

## ❌ 나쁜 예

```text
update code
fix bug
```

## ✅ 좋은 예

```text
feat: 사용자 프로필 수정 기능 추가
fix: 토큰 만료 시 리다이렉트 처리
```
