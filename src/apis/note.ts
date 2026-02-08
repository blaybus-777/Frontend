import { api } from '@/lib/axios';

export interface NoteItem {
  noteId: number;
  modelId: number;
  title: string;
  content: string;
  date: string; // "YYYY-MM-DD"
}

export interface NoteListResponse {
  items: NoteItem[];
  page: number;
}

// GET /v1/note/list/{modelId}
export const getNoteList = async (modelId: number): Promise<NoteListResponse> => {
  const response = await api.get(`/v1/note/list/${modelId}`);
  return response.data.data;
};

// DELETE /v1/note/delete/{noteId}
export const deleteNote = async (noteId: number): Promise<void> => {
  await api.get(`/v1/note/delete/${noteId}`);
};

// GET /v1/note/{noteId}
export const getNoteDetail = async (noteId: number): Promise<NoteItem> => {
  const response = await api.get(`/v1/note/${noteId}`);
  // The API returns a list structure even for a single note: { items: [NoteItem], page: 1 }
  const data = response.data.data;
  if (data.items && data.items.length > 0) {
    return data.items[0];
  }
  throw new Error('Note not found');
};
