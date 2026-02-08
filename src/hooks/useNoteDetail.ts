import { useState, useEffect } from 'react';
import { getNoteDetail, type NoteItem } from '@/apis/note';

export default function useNoteDetail(noteId: number | null) {
  const [note, setNote] = useState<NoteItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!noteId) {
      setNote(null);
      return;
    }

    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getNoteDetail(noteId);
        setNote(data);
      } catch (err) {
        console.error('Failed to fetch note detail:', err);
        setError('메모를 불러오는데 실패했습니다.');
        // Optional: fallback to find from store if API fails? 
        // For now, let's stick to API only as requested.
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [noteId]);

  return { note, isLoading, error };
}
