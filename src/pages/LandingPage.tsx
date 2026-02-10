import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Box,
  LayoutPanelLeft,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

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
          className="mb-16 cursor-pointer flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#42C2FF] to-[#4D94FF] px-5 py-3 text-base font-bold text-white shadow-lg shadow-[#42C2FF]/30 transition-all hover:shadow-xl hover:shadow-[#42C2FF]/40 hover:brightness-110"
        >
          지금 바로 시작하기 <ChevronRight className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-5xl px-4">
          <button className="text-foundation-gray-7 hover:text-foundation-black-text absolute top-1/2 -left-5 -translate-y-1/2 rounded-full p-2 transition-colors cursor-pointer">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button className="text-foundation-gray-7 hover:text-foundation-black-text absolute top-1/2 -right-5 -translate-y-1/2 rounded-full p-2 transition-colors cursor-pointer">
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
        <div className="grid max-w-6xl grid-cols-2 gap-x-12 gap-y-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 md:grid-cols-4 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <img
              key={num}
              src={`/img/${num}.png`}
              alt={`University ${num}`}
              className="mx-auto h-10 object-contain"
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-foundation-gray-2 flex flex-col items-center py-24">
        <span className="text-foundation-gray-7 mb-4 text-sm font-bold tracking-widest uppercase">
          HOW IT WORKS
        </span>
        <h2 className="mb-24 text-center text-4xl leading-tight font-bold">
          <span className="bg-linear-to-r from-[#42C2FF] to-foundation-blue-9 bg-clip-text text-transparent">
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
                src="/img/1.png"
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
                src="/img/3.jpg"
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
                src="/img/5.png"
                className="bg-foundation-gray-3 h-80 w-full object-cover"
                alt="Feature 3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Step Section */}
      <section className="flex flex-col items-center py-24">
        <span className="bg-linear-to-r from-[#42C2FF] to-foundation-blue-9 bg-clip-text mb-4 text-xl font-bold tracking-widest uppercase text-transparent">
          NOW, SIMVEX
        </span>
        <h2 className="mb-12 text-center text-4xl leading-tight font-bold">
          나만의 작은 연구실에서
          <br />
          3D 공학 학습을 시작하세요
        </h2>
        <button
          onClick={() => navigate('/topic')}
          className="cursor-pointer bg-foundation-black-text mb-20 flex items-center gap-2 rounded-full px-5 py-3 text-base font-bold text-white hover:bg-black"
        >
          지금 바로 시작하기 <ChevronRight className="h-5 w-5" />
        </button>

        <div className="mb-24 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: '1단계',
              title: '단일 부품 학습',
              desc: '부품 별 학습 포인트를 확인',
            },
            {
              step: '2단계',
              title: '조립도 분해',
              desc: '결합 구조를 직관적으로 이해',
            },
            {
              step: '3단계',
              title: 'AI 학습',
              desc: '실시간 이론적/학습적 학습 보조 AI',
            },
            {
              step: '4단계',
              title: '학습 기록',
              desc: '학습 내용을 기록하여 체계적으로 관리',
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
              <div className="bg-foundation-gray-3 border-foundation-gray-4 mt-2 h-48 w-full overflow-hidden rounded-xl border">
                <img
                  src={`/img/${idx + 1}.png`}
                  className="h-full w-full object-cover"
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
