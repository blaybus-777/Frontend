import ModelCard from "./ModelCard";
import type { ModelItem } from "@/types/model";

interface Props{
    items: ModelItem[];
}

export default function ModelCardGrid({items}:Props){
    return(
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 ">
            {items.map((item) => (
                <ModelCard key={item.id} item={item} />
            ))}
        </div>
    )
}