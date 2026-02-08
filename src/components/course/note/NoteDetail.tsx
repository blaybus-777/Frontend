import { useNoteStore } from '@/store/useNoteStore';
import { ChevronLeft, Pencil, Trash2 } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import DeleteConfirmModal from './DeleteConfirmModal';
import { useState } from 'react';
import useNoteDetail from '@/hooks/useNoteDetail';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import NoteEditor from './NoteEditor';

export default function NoteDetail() {
  const { selectedNoteId, setSelectedNoteId, deleteNote, updateNote } = useNoteStore(
    useShallow((state) => ({
      selectedNoteId: state.selectedNoteId,
      setSelectedNoteId: state.setSelectedNoteId,
      deleteNote: state.deleteNote,
      updateNote: state.updateNote,
    }))
  );

  const { note, isLoading, error, refetch } = useNoteDetail(selectedNoteId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // If editing, render the editor instead of the detail view
  if (isEditing && note) {
    return (
        <NoteEditor
          initialTitle={note.title}
          initialContent={note.content}
          onSubmit={async (title, content) => {
            if (selectedNoteId) {
              await updateNote(selectedNoteId, title, content);
              await refetch();
              setIsEditing(false);
            }
          }}
          onCancel={() => setIsEditing(false)}
          submitLabel="수정 완료"
        />
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-neutral-100 p-4 text-gray-500">
        <p>메모를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-gray-500">
        <p>{error || '메모를 찾을 수 없습니다.'}</p>
        <button
          onClick={() => setSelectedNoteId(null)}
          className="mt-4 text-blue-500 hover:underline"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  // Format date: "2026.02.02"
  const dateObj = new Date(note.date);
  const formattedDate = `${dateObj.getFullYear()}.${String(
    dateObj.getMonth() + 1
  ).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

  const handleDelete = async () => {
    if (selectedNoteId) {
      await deleteNote(selectedNoteId);
      setSelectedNoteId(null);
    }
  };

  return (
    <div className="flex h-full flex-col bg-neutral-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedNoteId(null)}
            className="cursor-pointer text-gray-700 transition-colors hover:text-gray-900"
            aria-label="목록으로 돌아가기"
          >
            <ChevronLeft size={24} />
          </button>
          <h3 className="line-clamp-1 text-base font-bold text-gray-900">
            {note.title}
          </h3>
        </div>
        <span className="text-sm text-gray-400">{formattedDate}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full overflow-y-auto rounded-lg bg-white p-5 shadow-sm custom-scrollbar">
          <MDXEditor
            markdown={note.content}
            readOnly={true}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              linkPlugin()
            ]}
            contentEditableClassName="prose prose-sm max-w-none text-gray-700"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex h-24 shrink-0 items-center justify-end gap-2 px-4">
        <button
          onClick={() => setIsEditing(true)}
          className="flex cursor-pointer items-center gap-1 text-gray-400 transition-colors hover:text-blue-500"
        >
          <Pencil size={16} />
          <span className="text-sm">수정</span>
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="flex cursor-pointer items-center gap-1 text-gray-400 transition-colors hover:text-red-500"
        >
          <Trash2 size={16} />
          <span className="text-sm">삭제</span>
        </button>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
