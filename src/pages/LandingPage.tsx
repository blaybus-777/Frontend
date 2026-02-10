import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Box,
  LayoutPanelLeft,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

// 캐러셀 이미지 목록 (상수)
const CAROUSEL_IMAGES = [
  '/landing/main_1.png',
  '/landing/main_2.png',
  '/landing/main_3.png',
  '/landing/main_4.png',
];

const LandingPage = () => {
  const navigate = useNavigate();

  // 캐러셀 상태 관리
  const [currentIndex, setCurrentIndex] = useState(0);

  // 좌우 이동 핸들러
  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-pretendard flex w-full flex-col bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center bg-white pt-20 pb-10">
        <h1 className="text-foundation-black-text mb-4 text-5xl font-extrabold">
          Be Like Engineer
        </h1>
        <p className="text-foundation-gray-8 mb-2 text-center text-xl">
          노트북 속 나만의 작은 연구실
        </p>
        <p className="mb-8 text-center text-xl font-bold">
          <span className="text-foundation-blue-9">공대생을 위한</span>{' '}
          엔지니어링 통합 SW
        </p>
        <button
          onClick={() => navigate('/topic')}
          className="mb-16 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#42C2FF] to-[#4D94FF] px-5 py-3 text-base font-bold text-white shadow-lg shadow-[#42C2FF]/30 transition-all hover:shadow-xl hover:shadow-[#42C2FF]/40 hover:brightness-110"
        >
          지금 바로 시작하기 <ChevronRight className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-5xl px-4">
          <button
            onClick={handlePrevious}
            className="text-foundation-gray-7 hover:text-foundation-black-text absolute top-1/2 -left-5 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* 캐러셀 이미지 */}
          <div className="relative overflow-hidden rounded-2xl">
            {/* 파란색 빛 번짐 효과 (Glow) */}
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(40, 49, 255, 0.4) 0%, rgba(40, 49, 255, 0) 70%)',
              }}
            />
            <img
              src={CAROUSEL_IMAGES[currentIndex]}
              alt={`랜딩 이미지 ${currentIndex + 1}`}
              className="relative z-10 h-96 w-full object-contain transition-all duration-500"
            />
          </div>

          {/* 인디케이터 점 */}
          <div className="mt-6 flex justify-center gap-2">
            {CAROUSEL_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 w-2 cursor-pointer rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-foundation-blue-9 w-8'
                    : 'bg-foundation-gray-4 hover:bg-foundation-gray-5'
                }`}
                aria-label={`이미지 ${idx + 1}로 이동`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="text-foundation-gray-7 hover:text-foundation-black-text absolute top-1/2 -right-5 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </section>

      {/* Partners Section */}
      <section className="flex flex-col items-center py-20">
        <span className="text-foundation-gray-7 mb-4 text-sm font-bold tracking-widest uppercase">
          WHY SIMVEX
        </span>
        <h2 className="mb-12 text-center text-3xl font-bold">
          50개 이상의 대학교와 20,000명 이상의 대학생이
          <br />
          SIMVEX와 함께{' '}
          <span className="text-foundation-blue-9 text-4xl">성장</span>하고
          있습니다.
        </h2>
        {/* 대학교 로고 무한 스크롤 */}
        <div className="w-full max-w-7xl space-y-8 overflow-hidden">
          {/* 첫 번째 줄 - 왼쪽으로 스크롤 */}
          <div className="relative flex">
            <div className="animate-scroll-left flex gap-12">
              {[
                'university1.png',
                'university2.png',
                'university3.png',
                'university4.png',
                'university5.png',
                'university6.png',
                'university7.png',
              ].map((logo, idx) => (
                <img
                  key={idx}
                  src={`/university/${logo}`}
                  alt={`University ${idx + 1}`}
                  className="h-12 w-auto shrink-0 object-contain opacity-80 transition-all duration-500 hover:opacity-100"
                />
              ))}
              {/* 무한 반복을 위한 복제 */}
              {[
                'university1.png',
                'university2.png',
                'university3.png',
                'university4.png',
                'university5.png',
                'university6.png',
                'university7.png',
              ].map((logo, idx) => (
                <img
                  key={`duplicate-${idx}`}
                  src={`/university/${logo}`}
                  alt={`University ${idx + 1}`}
                  className="h-12 w-auto shrink-0 object-contain opacity-80 transition-all duration-500 hover:opacity-100"
                />
              ))}
            </div>
          </div>

          {/* 두 번째 줄 - 오른쪽으로 스크롤 */}
          <div className="relative flex">
            <div className="animate-scroll-right flex gap-12">
              {[
                'university8.png',
                'university9.png',
                'university10.png',
                'university11.png',
                'university12.png',
                'university13.png',
              ].map((logo, idx) => (
                <img
                  key={idx}
                  src={`/university/${logo}`}
                  alt={`University ${idx + 8}`}
                  className="h-12 w-auto shrink-0 object-contain opacity-80 transition-all duration-500 hover:opacity-100"
                />
              ))}
              {/* 무한 반복을 위한 복제 */}
              {[
                'university8.png',
                'university9.png',
                'university10.png',
                'university11.png',
                'university12.png',
                'university13.png',
              ].map((logo, idx) => (
                <img
                  key={`duplicate-${idx}`}
                  src={`/university/${logo}`}
                  alt={`University ${idx + 8}`}
                  className="h-12 w-auto shrink-0 object-contain opacity-80 transition-all duration-500 hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scroll-right {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 35s linear infinite;
          }

          .animate-scroll-left:hover,
          .animate-scroll-right:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* How It Works Section */}
      <section className="bg-foundation-gray-2 flex flex-col items-center py-24">
        <span className="text-foundation-gray-7 mb-4 text-sm font-bold tracking-widest uppercase">
          HOW IT WORKS
        </span>
        <h2 className="mb-24 text-center text-4xl leading-tight font-bold">
          <span className="to-foundation-blue-9 bg-linear-to-r from-[#42C2FF] bg-clip-text text-transparent">
            전공 공부
          </span>
          를 게임처럼
          <br />
          이론과 실습을 <span className="text-foundation-blue-9">한 번에</span>
        </h2>

        <div className="flex w-full max-w-6xl flex-col gap-32 px-4">
          {/* Feature 1 */}
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <div className="bg-foundation-black-text flex h-12 w-12 items-center justify-center rounded-xl">
                <Zap className="h-6 w-6 fill-white text-white" />
              </div>
              <h3 className="text-2xl font-bold">3D 시뮬레이션 기반 학습</h3>
              <p className="text-foundation-gray-8 text-lg leading-relaxed">
                다양한 공학의 물리 현상과 산업 기계의 작동 원리를
                <br />
                3D 시뮬레이션으로 직관적으로 학습할 수 있습니다.
              </p>
            </div>
            <div className="border-foundation-gray-4 overflow-hidden rounded-2xl border bg-white shadow-xl lg:w-1/2">
              <img
                src="/landing/middle1.png"
                className="bg-foundation-gray-3 h-80 w-full object-cover"
                alt="Feature 1"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center justify-between gap-12 text-right lg:flex-row-reverse lg:text-left">
            <div className="flex flex-col items-end gap-6 lg:w-1/2 lg:items-start">
              <div className="bg-foundation-black-text flex h-12 w-12 items-center justify-center rounded-xl">
                <Box className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">3D CAD</h3>
              <p className="text-foundation-gray-8 text-lg leading-relaxed">
                학습한 이론을 직접 적용하며,
                <br />
                나만의 제품을 설계하고 검증할 수 있습니다.
              </p>
              <span className="text-foundation-gray-6 font-semibold">
                지원 예정
              </span>
            </div>
            <div className="border-foundation-gray-4 overflow-hidden rounded-2xl border bg-white shadow-xl lg:w-1/2">
              <img
                src="/landing/middle2.png"
                className="bg-foundation-gray-3 h-80 w-full object-cover"
                alt="Feature 2"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <div className="bg-foundation-black-text flex h-12 w-12 items-center justify-center rounded-xl">
                <LayoutPanelLeft className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">워크 플로우 차트</h3>
              <p className="text-foundation-gray-8 text-lg leading-relaxed">
                노드 기반 플로우 차트로 학습 내용을 구조화하고,
                <br />
                설계 중인 프로젝트를 논리적으로 정리할 수 있습니다.
              </p>
              <span className="text-foundation-gray-6 font-semibold">
                지원 예정
              </span>
            </div>
            <div className="border-foundation-gray-4 overflow-hidden rounded-2xl border bg-white shadow-xl lg:w-1/2">
              <img
                src="/landing/middle3.png"
                className="bg-foundation-gray-3 h-80 w-full object-cover"
                alt="Feature 3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Step Section */}
      <section className="flex flex-col items-center py-24">
        <span className="to-foundation-blue-9 mb-4 bg-linear-to-r from-[#42C2FF] bg-clip-text text-xl font-bold tracking-widest text-transparent uppercase">
          NOW, SIMVEX
        </span>
        <h2 className="mb-12 text-center text-4xl leading-tight font-bold">
          나만의 작은 연구실에서
          <br />
          3D 공학 학습을 시작하세요
        </h2>
        <button
          onClick={() => navigate('/topic')}
          className="bg-foundation-black-text mb-20 flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-base font-bold text-white hover:bg-black"
        >
          지금 바로 시작하기 <ChevronRight className="h-5 w-5" />
        </button>

        <div className="mb-24 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: '1단계',
              title: '단일 부품 학습',
              desc: '부품 별 학습 포인트를 확인',
              img: '/landing/bottom1.png',
            },
            {
              step: '2단계',
              title: '조립도 분해',
              desc: '결합 구조를 직관적으로 이해',
              img: '/landing/bottom2.png',
            },
            {
              step: '3단계',
              title: 'AI 학습',
              desc: '실시간 이론적/학습적 학습 보조 AI',
              img: '/landing/bottom3.png',
            },
            {
              step: '4단계',
              title: '학습 기록',
              desc: '학습 내용을 기록하여 체계적으로 관리',
              img: '/landing/bottom4.png',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4">
              <span className="border-foundation-blue-3 text-foundation-blue-9 rounded-full border px-3 py-1 text-sm font-bold">
                {item.step}
              </span>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-foundation-black-text text-center text-sm font-semibold">
                {item.desc}
              </p>
              <div className="mt-2 h-48 w-full overflow-hidden rounded-xl">
                <img
                  src={item.img}
                  className="h-full w-full object-contain"
                  alt={item.title}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
