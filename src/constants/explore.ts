export const CATEGORIES = [
  '전체',
  '드론',
  '로봇 암',
  // '로봇 그리퍼',
  // '리프 스프링',
  // '머신 바이스',
  '서스펜션',
  'V4 엔진',
] as const;

export type Category = (typeof CATEGORIES)[number];
