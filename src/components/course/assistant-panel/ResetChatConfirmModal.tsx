import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ResetChatConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetChatConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: ResetChatConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="animate-in fade-in zoom-in relative w-[320px] rounded-lg bg-white p-4 shadow-lg duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer rounded-sm text-gray-400 hover:bg-neutral-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h3 className="mb-2 text-lg font-bold text-gray-900">
          새 대화 목록 시작
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          새로운 채팅을 시작하면 기존 내역이 초기화됩니다.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="w-22.5 cursor-pointer rounded-lg border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-neutral-100"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="w-22.5 cursor-pointer rounded-lg bg-[#3469ff] py-2 text-sm font-medium text-white hover:bg-[#1E52E4]"
          >
            시작
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
