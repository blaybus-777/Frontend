import Footer from "@/components/layout/Footer";
import ExploreSidebar from "@/components/explore/ExploreSidebar";
import CourseCard from "@/components/explore/CourseCard";
import { Search } from "lucide-react";
import { useState } from "react";
import { TAGS } from "@/constants/explore";
import { MOCK_COURSES } from "@/data/mockCourses";


function ExplorePage() {
  const [selectedTag, setSelectedTag] = useState("전체");

  return (
    <>
      <div className="h-full max-w-[1200px] w-full px-4 md:px-6 my-20 mx-auto flex gap-10">
        <div>
          <ExploreSidebar />
        </div>
        <div className="flex flex-col gap-6 w-full justify-between">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
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
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-default-gray-3 text-foundation-black-text placeholder:text-tertiary-gray-3 focus:outline-none focus:border-foundation-black-text transition-colors"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {MOCK_COURSES.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                image={course.image}
                level={course.level}
                category={course.category}
                tags={course.tags}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExplorePage;