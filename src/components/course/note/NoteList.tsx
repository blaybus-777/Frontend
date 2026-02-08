import { useNoteStore } from '@/stores/useNoteStore';
import NoteItem from './NoteItem';
import DeleteConfirmModal from './DeleteConfirmModal';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

export default function NoteList() {
  const { id } = useParams<{ id: string }>();
  // Assuming id from URL is the modelId
  const modelId = id ? parseInt(id, 10) : 0; 

  const { notes, isLoading, fetchNotes, deleteNote, setSelectedNoteId } = useNoteStore(
    useShallow((state) => ({
      notes: state.notes,
      isLoading: state.isLoading,
      fetchNotes: state.fetchNotes,
      deleteNote: state.deleteNote,
      setSelectedNoteId: state.setSelectedNoteId,
    }))
  );
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (modelId) {
      fetchNotes(modelId);
    }
  }, [modelId, fetchNotes]);

  const handleDeleteClick = (noteId: number) => {
    setDeleteId(noteId);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await deleteNote(deleteId);
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {notes.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-sm">
          작성된 메모가 없습니다.
        </div>
      ) : (
        notes.map((note) => (
          <NoteItem
            key={note.noteId}
            note={note}
            onDelete={handleDeleteClick}
            onClick={() => setSelectedNoteId(note.noteId)}
          />
        ))
      )}

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
