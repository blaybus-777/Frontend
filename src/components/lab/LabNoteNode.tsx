import { memo, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Link2, Paperclip, Trash2 } from 'lucide-react';
import type { LabNode, LabNodeData } from '@/types/lab';

const ACCEPTED_EXTENSIONS = ['.pdf', '.xls', '.xlsx'];

function getFileBadgeColor(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith('.pdf')) return 'bg-rose-100 text-rose-600';
  if (lower.endsWith('.xls') || lower.endsWith('.xlsx')) {
    return 'bg-emerald-100 text-emerald-700';
  }
  return 'bg-slate-100 text-slate-600';
}

function LabNoteNode({ id, data, selected }: NodeProps<LabNode>) {
  const nodeData = data as LabNodeData;
  const [linkInput, setLinkInput] = useState('');
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const attachments = nodeData.attachments ?? [];

  const fileAccept = useMemo(() => ACCEPTED_EXTENSIONS.join(','), []);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    nodeData.onTextChange?.(id, event.target.value);
  };

  const handleAddLink = () => {
    const trimmed = linkInput.trim();
    if (!trimmed) return;
    nodeData.onAddLink?.(id, trimmed);
    setLinkInput('');
    setIsLinkModalOpen(false);
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    nodeData.onAddFiles?.(id, event.target.files);
    event.target.value = '';
  };

  return (
    <div
      className={`relative w-[320px] rounded-2xl border bg-white p-4 shadow-sm transition-shadow ${
        selected ? 'border-blue-500 shadow-lg' : 'border-slate-200'
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-start justify-between">
        <div>
          <input
            value={nodeData.title}
            onChange={(event) =>
              nodeData.onTitleChange?.(id, event.target.value)
            }
            placeholder="노트 제목"
            className="mt-1 w-full rounded-md border border-transparent bg-transparent text-lg font-bold text-slate-900 focus:border-blue-200 focus:outline-none"
          />
        </div>
        <button
          type="button"
          aria-label="노드 삭제"
          className="rounded-full p-1.5 text-rose-600 transition-colors hover:bg-rose-50"
          onClick={() => nodeData.onDeleteNode?.(id)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <textarea
        className="mt-3 h-24 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
        placeholder="단계별 수정사항과 기획 내용을 정리하세요."
        value={nodeData.text}
        onChange={handleTextChange}
      />

      <div className="mt-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {attachments.length === 0 ? (
            <div className="text-xs text-slate-400">
              첨부된 파일/링크가 없습니다.
            </div>
          ) : (
            attachments.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px]"
              >
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getFileBadgeColor(
                    item.name
                  )}`}
                >
                  {item.type === 'link'
                    ? 'LINK'
                    : item.name.split('.').pop()?.toUpperCase()}
                </span>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="max-w-[120px] truncate text-slate-700 hover:text-blue-600"
                    title={item.name}
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className="max-w-[120px] truncate text-slate-500">
                    {item.name}
                  </span>
                )}
                <button
                  type="button"
                  aria-label="첨부 삭제"
                  className="text-slate-400 hover:text-rose-500"
                  onClick={() => nodeData.onRemoveAttachment?.(id, item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <label className="flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition-colors hover:border-blue-400">
          <Paperclip className="h-4 w-4" />
          <input
            type="file"
            className="hidden"
            accept={fileAccept}
            multiple
            onChange={handleFiles}
          />
        </label>
        <button
          type="button"
          aria-label="링크 추가"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition-colors hover:border-blue-400"
          onClick={() => setIsLinkModalOpen(true)}
        >
          <Link2 className="h-4 w-4" />
        </button>
      </div>

      {isLinkModalOpen ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center rounded-2xl bg-black/20 p-4">
          <div className="w-full rounded-2xl bg-white p-4 shadow-xl">
            <div className="text-sm font-semibold text-slate-800">
              링크 추가
            </div>
            <input
              type="url"
              value={linkInput}
              onChange={(event) => setLinkInput(event.target.value)}
              placeholder="https://"
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                onClick={() => setIsLinkModalOpen(false)}
              >
                취소
              </button>
              <button
                type="button"
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                onClick={handleAddLink}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(LabNoteNode);
