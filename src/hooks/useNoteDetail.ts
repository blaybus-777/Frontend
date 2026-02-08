
import { useQuery } from '@tanstack/react-query';
import { getNoteDetail, type NoteItem } from '@/apis/note';

export default function useNoteDetail(noteId: number | null) {
  const {
    data: note,
    isLoading,
    error,
    refetch,
  } = useQuery<NoteItem, Error>({
    queryKey: ['note', noteId],
    queryFn: () => getNoteDetail(noteId!),
    enabled: !!noteId,
  });

  return {
    note: note || null,
    isLoading,
    error: error?.message || null,
    refetch,
  };
}
