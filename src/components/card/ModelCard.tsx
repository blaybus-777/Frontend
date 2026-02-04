import type { ModelItem } from "@/types/model";
import { useModelStore } from "@/stores/modelStore";
import ModelPreview from "./ModelPreview";
import {useState} from "react";

interface Props {
  item: ModelItem;
}

export default function ModelCard({ item }: Props) {
  const { select } = useModelStore();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onClick={() => select(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-none hover:shadow-lg transition-all duration-300 ease-out"
    >
      <div className="aspect-16/10 w-full bg-slate-100">
      {isHovered ? (
          <ModelPreview urls={item.modelUrl} />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <img
                src={item.thumbnail}
                alt={item.name}
                className="h-full w-full object-contain opacity-95"
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold">
          {item.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className=" rounded-md bg-#F3F4F7 px-3 py-1 text-xs text-#222"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}