import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModelPreview from './ModelPreview';

interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  tags?: string[];
  modelUrls?: string[];
}

export default function CourseCard({
  id,
  title,
  image,
  tags = [],
  modelUrls,
}: CourseCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-foundation-white-bg border-foundation-gray-4 hover:shadow-card-hover flex h-full cursor-pointer flex-col gap-4 rounded-sm border p-3 transition-shadow duration-300"
    >
      {/* Thumbnail */}
      <div className="bg-foundation-gray-1 border-foundation-gray-4 relative aspect-3/2 w-full overflow-hidden rounded-sm border">
        {isHovered && modelUrls && modelUrls.length > 0 ? (
          <div className="absolute inset-0 z-10">
            <ModelPreview urls={modelUrls} />
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div
        onClick={() => navigate(`/course/${id}`)}
        className="flex flex-1 flex-col gap-3"
      >
        <h3
          className="text-foundation-black-text line-clamp-1 text-lg font-bold"
          title={title}
        >
          {title}
        </h3>

        {/* Tags */}
        <div className="mt-auto flex h-[50px] flex-wrap content-start gap-2 overflow-hidden">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-foundation-black-text h-fit shrink rounded-sm border-none bg-neutral-100 px-1 text-sm leading-none font-medium shadow-none"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
