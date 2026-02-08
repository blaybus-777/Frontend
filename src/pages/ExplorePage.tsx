import Footer from '@/components/layout/Footer';
import ExploreSidebar from '@/components/explore/ExploreSidebar';
import CourseCard from '@/components/explore/CourseCard';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { TAGS } from '@/constants/explore';
// import { MOCK_COURSES } from "@/data/mockCourses";
import { useModelList } from '@/hooks/useModelList';
import type { ExtendedModel } from '@/hooks/useModelList';

function ExplorePage() {
  const [selectedTag, setSelectedTag] = useState('전체');
  const { data: modelList, isLoading, isError } = useModelList();

  return (
    <>
      <div className="mx-auto my-20 flex h-full w-full max-w-[1200px] gap-10 px-4 md:px-6">
        <div>
          <ExploreSidebar />
        </div>
        <div className="flex w-full flex-col justify-between gap-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <h1 className="text-foundation-black-text text-2xl font-extrabold">
              3D 시뮬레이션
            </h1>
            <div className="flex items-center justify-between">
              {/* Tags */}
              <div className="flex gap-2">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full border px-4 py-2 text-base font-semibold transition-colors ${
                      selectedTag === tag
                        ? 'bg-foundation-black-text border-foundation-black-text text-white'
                        : 'text-foundation-black-text border-default-gray-3 hover:bg-foundation-gray-1 bg-white'
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
                  className="border-default-gray-3 text-foundation-black-text placeholder:text-tertiary-gray-3 focus:border-foundation-black-text w-full rounded-xl border-2 px-4 py-2.5 transition-colors focus:outline-none"
                />
                <Search className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error loading courses</div>
            ) : (
              modelList?.map((course: ExtendedModel) => (
                <CourseCard
                  key={course.modelId}
                  id={String(course.modelId)}
                  title={course.title}
                  image={course.image}
                  level={course.tags?.[0] || 'Level'}
                  category={course.tags?.[1] || 'Category'}
                  tags={course.tags?.slice(2) || []}
                  modelUrls={course.modelUrls}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExplorePage;
