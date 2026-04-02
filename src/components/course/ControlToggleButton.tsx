import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ControlToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function ControlToggleButton({
  label,
  isActive,
  onClick,
}: ControlToggleButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'h-auto flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors',
        isActive
          ? 'bg-[#3469FF] text-white hover:bg-[#3469FF]/90 hover:text-white'
          : 'bg-gray-300 text-gray-400 hover:bg-gray-400 hover:text-white'
      )}
    >
      {label}
    </Button>
  );
}
