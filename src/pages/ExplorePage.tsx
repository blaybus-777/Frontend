import Footer from '@/components/layout/Footer';
import ExploreSidebar from '@/components/explore/ExploreSidebar';
import CourseCard from '@/components/course/CourseCard';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { FINAL_PREVIEW_URLS } from '@/constants/assets';
import { useModelList } from '@/hooks/useModelList';
import { useModelSearch } from '@/hooks/useModelSearch';
import { useEnums } from '@/hooks/useEnums';
import type { ExtendedModel } from '@/hooks/useModelList';

function ExplorePage() {
  const [selectedTag, setSelectedTag] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Enum 데이터 가져오기
  const { levelTags, levelTagMap, levelDisplayMap, isLoading: isEnumsLoading } = useEnums();
  
  // 전체 목록 조회
  const { data: modelList, isLoading: isListLoading, isError: isListError } = useModelList();
  
  // 태그 목록 생성 (전체 + API에서 가져온 난이도 태그)
  const tags = useMemo(() => {
    return ['전체', ...levelTags.map(tag => tag.code)];
  }, [levelTags]);
  
  // 난이도별 검색
  const apiTag = selectedTag !== '전체' && levelTagMap[selectedTag] ? [levelTagMap[selectedTag]] : [];
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useModelSearch(apiTag, searchQuery);
  
  // 전체인 경우 목록, 아닌 경우 검색 결과 사용
  const displayData = selectedTag === '전체' ? modelList : searchResults;
  const isLoading = selectedTag === '전체' ? isListLoading : isSearchLoading || isEnumsLoading;
  const isError = selectedTag === '전체' ? isListError : isSearchError;

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
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full border px-4 py-2 text-base font-semibold transition-colors ${
                      selectedTag === tag
                        ? 'bg-foundation-black-text border-foundation-black-text text-white'
                        : 'text-foundation-black-text border-default-gray-3 hover:bg-foundation-gray-1 bg-white'
                    }`}
                  >
                    {levelDisplayMap[tag] || tag}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-24">
                <input
                  type="text"
                  placeholder="검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              displayData
                ?.filter(
                  (course: ExtendedModel) =>
                    course.assetKey &&
                    FINAL_PREVIEW_URLS[
                      course.assetKey as keyof typeof FINAL_PREVIEW_URLS
                    ]
                )
                .map((course: ExtendedModel) => {
                  const previewUrl = course.assetKey
                    ? FINAL_PREVIEW_URLS[
                        course.assetKey as keyof typeof FINAL_PREVIEW_URLS
                      ]
                    : undefined;
                  return (
                    <CourseCard
                      key={course.modelId}
                      id={String(course.modelId)}
                      title={course.title}
                      image={course.image}
                      tags={course.tag}
                      modelUrls={previewUrl ? [previewUrl] : course.modelUrls}
                    />
                  );
                })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExplorePage;
