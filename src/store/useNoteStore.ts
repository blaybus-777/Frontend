import { create } from 'zustand';
import { getNoteList, deleteNote } from '@/apis/note';
import type { NoteItem } from '@/apis/note';

interface NoteState {
  notes: NoteItem[];
  isLoading: boolean;
  error: string | null;

  fetchNotes: (modelId: number) => Promise<void>;
  deleteNote: (noteId: number) => Promise<void>;
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

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  isLoading: false,
  error: null,

  fetchNotes: async (modelId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getNoteList(modelId);
      set({ notes: data.items, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch notes, using MOCK data:', error);
      // Fallback to mock data for testing
      set({ notes: MOCK_NOTES, isLoading: false, error: null });
    }
  },

  deleteNote: async (noteId: number) => {
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error('Failed to delete note (API), updating UI anyway:', error);
    }
    // Always update UI for testing purposes
    set((state) => ({
      notes: state.notes.filter((note) => note.noteId !== noteId),
    }));
  },
}));
