import { Trash2 } from 'lucide-react';
import type { NoteItem } from '@/apis/note';

interface NoteItemProps {
  note: NoteItem;
  onDelete: (noteId: number) => void;
  onClick: () => void;
}

export default function NoteItem({ note, onDelete, onClick }: NoteItemProps) {
  const dateObj = new Date(note.date);
  const formattedDate = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  return (
      <div
        onClick={onClick}
        className="group flex cursor-pointer flex-col gap-2 rounded-xl px-4 py-2 transition-colors hover:bg-neutral-300 active:bg-active"
      >
        <div className="flex items-center justify-between">
          <h4 className="line-clamp-1 text-base font-bold text-foundation-black-text group-active:text-neutral-50">
            {note.title}
          </h4>
          <span className="shrink-0 text-sm font-medium text-foundation-black-text group-active:text-neutral-50">
            {formattedDate}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="line-clamp-1 flex-1 text-sm text-gray-600 group-active:text-neutral-50">
            {note.content}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.noteId);
            }}
            className="shrink-0 text-gray-500 transition-colors hover:text-red-500 group-active:text-neutral-50 cursor-pointer"
            aria-label="메모 삭제"
          >
            <Trash2 size={20} />
          </button>
        </div>
    </div>
  );
}
