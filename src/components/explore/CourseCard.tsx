import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModelPreview from "./ModelPreview";

interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  level: string;
  category: string;
  tags: string[];
  modelUrls?: string[];
}

export default function CourseCard({
  id,
  title,
  image,
  level,
  category,
  tags,
  modelUrls,
}: CourseCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col h-full bg-foundation-white-bg border border-foundation-gray-4 rounded-sm p-3 gap-4 hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Thumbnail */}
      <div className="aspect-3/2 w-full overflow-hidden rounded-sm bg-foundation-gray-1 border border-foundation-gray-4 relative">
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
        className="flex flex-col gap-3 flex-1"
      >
        <h3 className="text-lg font-bold text-foundation-black-text line-clamp-1" title={title}>
          {title}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto h-[50px] overflow-hidden content-start">
          {/* Level Badge */}
          <Badge variant="secondary" className="bg-neutral-100 text-foundation-black-text rounded-sm px-1 text-sm leading-none font-medium border-none shadow-none shrink h-fit">
            {level}
          </Badge>
          
          {/* Category Badge */}
          <Badge variant="secondary" className="bg-neutral-100 text-foundation-black-text rounded-sm px-1 text-sm leading-none font-medium border-none shadow-none shrink h-fit">
            {category}
          </Badge>

          {/* Other Tags */}
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-neutral-100 text-foundation-black-text rounded-sm px-1 text-sm leading-none font-medium border-none shadow-none shrink h-fit"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
