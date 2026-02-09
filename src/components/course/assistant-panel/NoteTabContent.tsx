import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useNoteStore } from '@/stores/useNoteStore';
import NoteList from '../note/NoteList';
import NoteDetail from '../note/NoteDetail';
import NoteEditor from '../note/NoteEditor';


/**
 * 메모 탭 콘텐츠 컴포넌트
 * - 단일 책임: 메모 관련 상태에 따른 뷰 렌더링만 담당
 * - 의존성 역전: useNoteStore 추상화를 통해 구체적인 구현에 의존하지 않음
 */
export default function NoteTabContent() {
  const { id } = useParams<{ id: string }>();
  const modelId = id ? parseInt(id, 10) : 0;

  const { selectedNoteId, isCreating, setIsCreating, createNote } =
    useNoteStore(
      useShallow((state) => ({
        selectedNoteId: state.selectedNoteId,
        isCreating: state.isCreating,
        setIsCreating: state.setIsCreating,
        createNote: state.createNote,
      }))
    );

  const handleCreateSubmit = async (title: string, content: string) => {
    if (modelId === 0) {
      alert('모델 ID를 찾을 수 없습니다.');
      return;
    }
    await createNote(modelId, title, content);
  };

  // 상태에 따른 뷰 렌더링
  if (isCreating) {
    return (
      <NoteEditor
        onSubmit={handleCreateSubmit}
        onCancel={() => setIsCreating(false)}
      />
    );
  }

  if (selectedNoteId) {
    return <NoteDetail />;
  }

  return <NoteListView onAddNote={() => setIsCreating(true)} />;
}

/**
 * 메모 리스트 뷰 컴포넌트
 * - 단일 책임: 메모 리스트와 추가 버튼 레이아웃만 담당
 */
interface NoteListViewProps {
  onAddNote: () => void;
}

function NoteListView({ onAddNote }: NoteListViewProps) {
  return (
    <div className="flex h-full flex-col">
      <h3 className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500">
        메모
      </h3>
      <div
        className="flex-1 overflow-y-auto bg-neutral-100"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}
      >
        <NoteList />
      </div>
      <div className="flex justify-center bg-neutral-100 p-4 pt-2">
        <button
          className="w-40 rounded-full bg-gray-200 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-300"
          onClick={onAddNote}
        >
          메모 추가
        </button>
      </div>
    </div>
  );
}
