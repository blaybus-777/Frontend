import { create } from 'zustand';
import {
  getNoteList,
  deleteNote as deleteNoteApi,
  createNote as createNoteApi,
  updateNote as updateNoteApi,
  type NoteItem,
} from '@/apis/note';

export interface NoteState {
  notes: NoteItem[];
  isLoading: boolean;
  error: string | null;

  fetchNotes: (modelId: number) => Promise<void>;
  deleteNote: (noteId: number) => Promise<void>;
  
  selectedNoteId: number | null;
  setSelectedNoteId: (id: number | null) => void;

  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
  createNote: (modelId: number, title: string, content: string) => Promise<void>;
  updateNote: (noteId: number, title: string, content: string) => Promise<void>;
}

const MOCK_NOTES: NoteItem[] = [
  {
    noteId: 1,
    modelId: 1,
    title: '드론 프로펠러의 역할',
    content:
      '카본 재질은 가볍고 강성이 높아 비행 안정성을 높여준다. 리프트 생성을 위한 주요 부품.',
    date: '2024-02-05',
  },
  {
    noteId: 2,
    modelId: 1,
    title: '드론 프레임 재질과 무게',
    content:
      '카본 재질은 가볍고 강성이 높아 비행 안정성을 높여준다. 충격 흡수에도 유리하다.',
    date: '2024-02-02',
  },
  {
    noteId: 3,
    modelId: 1,
    title: '배터리 관리 주의사항',
    content:
      '리튬 폴리머 배터리는 완전 방전 시 재사용이 불가능할 수 있으므로 주의가 필요하다. 보관 시 50~60% 충전 상태 유지.',
    date: '2024-01-28',
  },
];

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  selectedNoteId: null,
  isLoading: false,
  error: null,
  isCreating: false,

  fetchNotes: async (modelId: number) => {
    set({ isLoading: true });
    try {
      const data = await getNoteList(modelId);
      set({ notes: data.items });
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedNoteId: (id) => set({ selectedNoteId: id, isCreating: false }),

  setIsCreating: (isCreating) => set({ isCreating, selectedNoteId: null }),

  deleteNote: async (noteId) => {
    try {
      await deleteNoteApi(noteId);
      set((state) => ({
        notes: state.notes.filter((note) => note.noteId !== noteId),
        selectedNoteId: state.selectedNoteId === noteId ? null : state.selectedNoteId,
      }));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  },

  createNote: async (modelId, title, content) => {
    try {
      await createNoteApi(modelId, title, content);
      await get().fetchNotes(modelId);
      set({ isCreating: false });
    } catch (error) {
      console.error('Failed to create note:', error);
      throw error;
    }
  },

  updateNote: async (noteId, title, content) => {
    try {
      await updateNoteApi(noteId, title, content);
      // Update list to reflect title changes if necessary
      const currentNotes = get().notes;
      const modelId = currentNotes.find(n => n.noteId === noteId)?.modelId;
      if (modelId) {
        await get().fetchNotes(modelId);
      }
    } catch (error) {
      console.error('Failed to update note:', error);
      throw error;
    }
  },
}));
