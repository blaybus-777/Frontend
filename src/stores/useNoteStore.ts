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
  createNote: (
    modelId: number,
    title: string,
    content: string
  ) => Promise<void>;
  updateNote: (noteId: number, title: string, content: string) => Promise<void>;
}

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
        selectedNoteId:
          state.selectedNoteId === noteId ? null : state.selectedNoteId,
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
      const modelId = currentNotes.find((n) => n.noteId === noteId)?.modelId;
      if (modelId) {
        await get().fetchNotes(modelId);
      }
    } catch (error) {
      console.error('Failed to update note:', error);
      throw error;
    }
  },
}));
