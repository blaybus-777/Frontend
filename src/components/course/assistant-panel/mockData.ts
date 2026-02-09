import type { Part, LearningContent } from './types';

/**
 * Mock 부품 데이터
 */
export const MOCK_PARTS: Part[] = [
  {
    id: 'main-frame',
    name: 'Main Frame',
    image: 'https://placehold.co/100x100/blue/white?text=Main+Frame',
    englishName: 'Main Frame',
  },
  {
    id: 'propeller',
    name: 'Propeller',
    image: 'https://placehold.co/100x100/gray/white?text=Propeller',
    englishName: 'Propeller',
  },
  {
    id: 'motor',
    name: 'Motor',
    image: 'https://placehold.co/100x100/gray/white?text=Motor',
    englishName: 'Motor',
  },
  {
    id: 'battery',
    name: 'Battery',
    image: 'https://placehold.co/100x100/gray/white?text=Battery',
    englishName: 'Battery',
  },
  {
    id: 'esc',
    name: 'ESC',
    image: 'https://placehold.co/100x100/gray/white?text=ESC',
    englishName: 'ESC',
  },
  {
    id: 'fc',
    name: 'FC',
    image: 'https://placehold.co/100x100/gray/white?text=FC',
    englishName: 'FC',
  },
  {
    id: 'gps',
    name: 'GPS',
    image: 'https://placehold.co/100x100/gray/white?text=GPS',
    englishName: 'GPS',
  },
  {
    id: 'receiver',
    name: 'Receiver',
    image: 'https://placehold.co/100x100/gray/white?text=Receiver',
    englishName: 'Receiver',
  },
  {
    id: 'camera',
    name: 'Camera',
    image: 'https://placehold.co/100x100/gray/white?text=Camera',
    englishName: 'Camera',
  },
  {
    id: 'vtx',
    name: 'VTX',
    image: 'https://placehold.co/100x100/gray/white?text=VTX',
    englishName: 'VTX',
  },
  {
    id: 'antenna',
    name: 'Antenna',
    image: 'https://placehold.co/100x100/gray/white?text=Antenna',
    englishName: 'Antenna',
  },
];

/**
 * Mock 학습 콘텐츠 데이터
 */
export const MOCK_LEARNING_CONTENT: LearningContent = {
  title: '「Main Frame」이란?',
  description: [
    '드론의 모든 부품이 결합되는 중심 구조물',
    '기체의 전체 형상을 결정',
  ],
  materials: [
    'ABS 플라스틱: 강성과 가공성 균형',
    '나일론 강화 소재: 내구성 향상',
    '카본 복합재: 경량·고강성 목적',
  ],
  theory: ['하중을 분산하는 프레임 구조 원리', '대칭 구조에 의한 안정성 확보'],
  role: ['모든 부품의 기준 구조', '하중을 전체로 분산', '드론의 형태를 유지'],
};
