import {create} from 'zustand';
import type { ModelItem } from '@/types/model';

interface ModelState{
    selected: ModelItem | null;
    select:(item: ModelItem)=>void;
    clear:()=>void;
}

export const useModelStore = create<ModelState>((set)=>({
    selected: null,
    select: (item: ModelItem) => set({selected: item}),
    clear: () => set({selected: null}),
}));
