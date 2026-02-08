import { Trash2 } from 'lucide-react';
import type { NoteItem } from '@/apis/note';

interface NoteItemProps {
  note: NoteItem;
  onDelete: (noteId: number) => void;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
  // Format date: "2026.02.02"
  const dateObj = new Date(note.date);
  const formattedDate = `${dateObj.getFullYear()}.${String(
    dateObj.getMonth() + 1
  ).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

  return (
    <div className="group flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-[#3469ff]">
      <h4 className="line-clamp-1 flex-1 text-base font-bold text-gray-900 group-hover:text-white">
        {note.title}
      </h4>
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-sm text-gray-500 group-hover:text-white/80">{formattedDate}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.noteId);
          }}
          className="text-gray-400 transition-colors hover:text-red-500 group-hover:text-white"
          aria-label="메모 삭제"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
