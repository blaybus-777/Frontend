import Footer from "@/components/layout/Footer";
import ExploreSidebar from "@/components/explore/ExploreSidebar";
import { Search } from "lucide-react";
import { useState } from "react";

const TAGS = ["전체", "초급", "중급", "고급"];

function ExplorePage() {
  const [selectedTag, setSelectedTag] = useState("전체");

  return (
    <>
      <div className="h-full max-w-[1200px] w-[62.5%] my-20 mx-auto flex gap-10">
        <div>
          <ExploreSidebar />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-extrabold text-foundation-black-text">
            3D 시뮬레이션
          </h1>
          <div className="flex items-center justify-between">
            {/* Tags */}
            <div className="flex gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-base font-semibold transition-colors border ${
                    selectedTag === tag
                      ? "bg-foundation-black-text text-white border-foundation-black-text"
                      : "bg-white text-foundation-black-text border-default-gray-3 hover:bg-foundation-gray-1"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-24">
              <input
                type="text"
                placeholder="검색"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-default-gray-3 text-foundation-black-text placeholder:text-tertiary-gray-3"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-black stroke-3" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExplorePage;