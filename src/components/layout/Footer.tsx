import x from '@/assets/x.svg';
import instagram from '@/assets/instagram.svg';
import youtube from '@/assets/youtube.svg';
import linkedin from '@/assets/linkedin.svg';

function Footer() {
  return (
    <footer className="border-foundation-gray-5 bg-foundation-gray-3 flex w-full flex-col justify-center border-t border-b py-20">
      <div className="relative mx-auto flex h-80 w-full max-w-[1200px] items-start justify-between gap-36">
        <div className="flex w-60 flex-col gap-8">
          <div className="to-foundation-blue-9 font-pretendard bg-linear-to-r from-[#42C2FF] bg-clip-text text-3xl font-extrabold text-transparent">
            SIMVEX
          </div>
          <p className="text-foundation-black-text text-xl font-semibold">
            공대생을 위한
            <br />
            엔지니어링 통합 SW
          </p>
          <div className="flex gap-4">
            <img src={x} height={24} width={24} alt="x logo" />
            <img src={instagram} height={24} width={24} alt="instagram logo" />
            <img src={youtube} height={24} width={24} alt="youtube logo" />
            <img src={linkedin} height={24} width={24} alt="linkedin logo" />
          </div>
        </div>
        <div className="flex h-full gap-4">
          <div className="flex min-w-56 flex-col gap-3">
            <p className="text-foundation-black-text mt-2 mb-4 text-base font-semibold">
              About
            </p>
            <p className="text-foundation-black-text text-base">SIMVEX 소개</p>
            <p className="text-foundation-black-text text-base">멤버십 소개</p>
            <p className="text-foundation-black-text text-base">문의하기</p>
          </div>
          <div className="flex min-w-56 flex-col gap-3">
            <p className="text-foundation-black-text mt-2 mb-4 text-base font-semibold">
              Course
            </p>
            <p className="text-foundation-black-text text-base">
              3D 시뮬레이션 기반 학습
            </p>
            <p className="text-foundation-black-text text-base">3D CAD</p>
            <p className="text-foundation-black-text text-base">
              워크 플로우 차트
            </p>
          </div>
          <div className="flex min-w-56 flex-col gap-3">
            <p className="text-foundation-black-text mt-2 mb-4 text-base font-semibold">
              고객센터
            </p>
            <p className="text-foundation-black-text text-base">공지사항</p>
            <p className="text-foundation-black-text text-base">
              자주묻는 질문
            </p>
            <p className="text-foundation-black-text text-base">
              저작권 신고센터
            </p>
            <p className="text-foundation-black-text text-base">수료증 확인</p>
            <p className="text-foundation-black-text text-base">
              강의 ・기능요청
            </p>
          </div>
        </div>
      </div>
      <div className="border-foundation-gray-6 mx-auto flex w-full max-w-[1200px] items-center justify-between border-t pt-6">
        <p className="text-foundation-gray-8 text-base font-semibold">
          © 2026 SIMVEX. All rights reserved.
        </p>
        <div className="flex w-60 justify-between">
          <p className="text-foundation-gray-8 text-base">Privacy Policy</p>
          <p className="text-foundation-gray-8 text-base">Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
