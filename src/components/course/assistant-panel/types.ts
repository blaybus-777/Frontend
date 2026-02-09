/**
 * 부품 정보 타입
 */
export interface Part {
  id: string;
  name: string;
  image: string;
}

/**
 * 학습 콘텐츠 타입
 */
export interface LearningContent {
  title: string;
  description: string[];
  materials: string[];
  theory: string[];
  role: string[];
}

/**
 * 탭 타입
 */
export type TabType = 'study' | 'memo' | 'ai-tutor';

/**
 * 탭 컴포넌트 Props 인터페이스
 * 현재는 공통 Props가 없지만, 향후 확장을 위해 정의
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabContentProps {
  // 각 탭 컴포넌트가 필요로 하는 공통 Props (필요시 확장)
}

