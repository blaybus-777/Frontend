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
  CodeToggle
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { Save, X } from 'lucide-react';

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
  submitLabel = '저장',
}: NoteEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      className="flex h-full flex-col bg-neutral-100"
    >
      <div className="flex-1 flex flex-col p-4 overflow-visible">
        <div className="flex h-full flex-col rounded-lg bg-white shadow-sm">
          {/* Header (Title Input) */}
          <div className="border-b border-gray-100 p-4">
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
          <div className="flex-1">
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, value } }) => (
                <MDXEditor
                  markdown={value || ''}
                  onChange={onChange}
                  className="h-full flex flex-col note-editor-root"
                  contentEditableClassName="mdxeditor-root-contenteditable prose prose-sm max-w-none px-6 py-4 focus:outline-none h-full overflow-y-auto custom-scrollbar"
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
                          <div className="flex items-center gap-1 border-b border-gray-100 px-2 py-1">
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
              <p className="px-6 py-2 text-xs text-red-500 bg-red-50 border-t border-red-100">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-2 px-4 py-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
          disabled={isSubmitting}
        >
          <X size={16} />
          취소
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          <Save size={16} />
          {isSubmitting ? '저장 중...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
