import x from "@/assets/x.svg";
import instagram from "@/assets/instagram.svg";
import youtube from "@/assets/youtube.svg";
import linkedin from "@/assets/linkedin.svg";


function Footer() {
    return (
        <footer className="w-full border-t border-b border-foundation-gray-5 flex flex-col justify-center py-20 bg-foundation-gray-3">
            <div className="w-full max-w-[1200px] h-80 mx-auto flex items-start relative gap-36 justify-between">
                <div className="flex flex-col gap-8 w-60">
                    <div className="bg-linear-to-r from-[#42C2FF] to-foundation-blue-9 bg-clip-text text-3xl font-extrabold font-pretendard text-transparent">
                        simvex
                    </div>
                    <p className="font-semibold text-xl text-foundation-black-text">공대생을 위한<br/>엔지니어링 통합 SW</p>
                    <div className="flex gap-4">
                        <img src={x} height={24} width={24} alt="x logo" />
                        <img src={instagram} height={24} width={24} alt="instagram logo" />
                        <img src={youtube} height={24} width={24} alt="youtube logo" />
                        <img src={linkedin} height={24} width={24} alt="linkedin logo" />
                    </div>
                </div>
                <div className="h-full flex gap-4">
                    <div className="flex flex-col gap-3 min-w-56">
                        <p className="text-foundation-black-text font-semibold text-base mb-4 mt-2">About</p>
                        <p className="text-foundation-black-text text-base">SIMVEX 소개</p>
                        <p className="text-foundation-black-text text-base">멤버십 소개</p>
                        <p className="text-foundation-black-text text-base">문의하기</p>
                    </div>
                    <div className="flex flex-col gap-3 min-w-56">
                        <p className="text-foundation-black-text font-semibold text-base mb-4 mt-2">Course</p>
                        <p className="text-foundation-black-text text-base">3D 시뮬레이션 기반 학습</p>
                        <p className="text-foundation-black-text text-base">3D CAD</p>
                        <p className="text-foundation-black-text text-base">워크 플로우 차트</p>
                    </div>
                    <div className="flex flex-col gap-3 min-w-56">
                        <p className="text-foundation-black-text font-semibold text-base mb-4 mt-2">고객센터</p>
                        <p className="text-foundation-black-text text-base">공지사항</p>
                        <p className="text-foundation-black-text text-base">자주묻는 질문</p>
                        <p className="text-foundation-black-text text-base">저작권 신고센터</p>
                        <p className="text-foundation-black-text text-base">수료증 확인</p>
                        <p className="text-foundation-black-text text-base">강의 ・기능요청</p>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[1200px] pt-6 mx-auto flex justify-between items-center border-t border-foundation-gray-6">
                <p className="text-foundation-gray-8 font-semibold text-base">© 2026 SIMVEX. All rights reserved.</p>
                <div className="flex w-60 justify-between">
                    <p className="text-foundation-gray-8 text-base">Privacy Policy</p>
                    <p className="text-foundation-gray-8 text-base">Terms of Service</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;