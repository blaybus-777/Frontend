import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  linkPlugin,
  linkDialogPlugin,
  CreateLink,
  codeBlockPlugin,
  InsertCodeBlock,
  BlockTypeSelect,
  CodeToggle,
  type MDXEditorMethods
} from '@mdxeditor/editor';
import { useRef } from 'react';
import '@mdxeditor/editor/style.css';
import { SquareCheckBig, X } from 'lucide-react';

const noteSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function NoteEditor({
  initialTitle = '',
  initialContent = '',
  onSubmit,
  onCancel,
}: NoteEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef<MDXEditorMethods>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: initialTitle,
      content: initialContent,
    },
  });

  const onFormSubmit = async (data: NoteFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(data.title, data.content);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex h-full min-h-0 flex-col bg-neutral-100 overflow-hidden"
    >
      <div className="flex-1 flex flex-col p-4 overflow-hidden min-h-0">
        <div className="flex h-full flex-col rounded-lg bg-white shadow-sm overflow-hidden">
          {/* Header (Title Input) */}
          <div className="border-b border-gray-100 p-4 shrink-0">
            <input
              {...register('title')}
              placeholder="제목을 입력하세요"
              className="w-full text-base font-bold placeholder:text-gray-300 focus:outline-none"
              autoFocus={!initialTitle}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Editor Area */}
          <div 
            className="flex-1 flex flex-col cursor-text overflow-y-auto min-h-0 custom-scrollbar" 
            onClick={(e) => {
              const target = e.target as HTMLElement;
              // 버튼, 입력창, 링크, 다이얼로그 내부 클릭 시에는 포커스 강제 이동 방지
              if (
                target.tagName === 'BUTTON' || target.closest('button') ||
                target.tagName === 'INPUT' || target.closest('input') ||
                target.tagName === 'A' || target.closest('a') ||
                target.closest('[role="dialog"]') ||
                target.closest('.mdxeditor-toolbar')
              ) {
                return;
              }
              editorRef.current?.focus();
            }}
          >
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, value } }) => (
                <MDXEditor
                  ref={editorRef}
                  markdown={value || ''}
                  onChange={onChange}
                  className="note-editor-root"
                  contentEditableClassName="prose prose-sm max-w-none px-6 py-4 focus:outline-none"
                  placeholder="마크다운을 이용해서 편리하게 글을 작성할 수 있어요."
                  autoFocus={false}
                  plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    markdownShortcutPlugin(),
                    linkPlugin(),
                    linkDialogPlugin(),
                    codeBlockPlugin({ codeBlockEditorDescriptors: [] }),
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          {' '}
                          <div className="mdxeditor-toolbar flex items-center gap-1 border-b border-gray-100 px-2 py-1 shrink-0">
                            <BoldItalicUnderlineToggles />
                            <div className="mx-1 h-4 w-px bg-gray-200" />
                            <CreateLink />
                            <div className="mx-1 h-4 w-px bg-gray-200" />
                            <BlockTypeSelect />
                            <div className="mx-1 h-4 w-px bg-gray-200" />
                            <CodeToggle />
                            <InsertCodeBlock />
                          </div>
                        </>
                      )
                    })
                  ]}
                />
              )}
            />
            {errors.content && (
              <p className="px-6 py-2 text-xs text-red-500 bg-red-50 border-t border-red-100 shrink-0">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-2 px-4 py-3 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 rounded-lg text-gray-500 hover:text-gray-700 font-medium px-3 py-2 transition-colors"
          disabled={isSubmitting}
        >
          <X size={16}  />
          <span className="text-sm">취소</span>
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-medium px-3 py-2 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          <SquareCheckBig size={16} />
          <span className="text-sm">{isSubmitting ? '저장 중...' : '저장'}</span>
        </button>
      </div>
    </form>
  );
}
