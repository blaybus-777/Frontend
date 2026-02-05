import Footer from "@/components/layout/Footer";
import ExploreSidebar from "@/components/explore/ExploreSidebar";

function ExplorePage() {
  return (
    <>
    <div className="w-full max-w-[1200px] mt-20 mx-auto flex gap-10">
      <div>
        <ExploreSidebar />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold text-foundation-black-text">3D 시뮬레이션</h1>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ExplorePage;