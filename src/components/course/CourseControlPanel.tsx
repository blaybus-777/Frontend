import { ControlToggleButton } from './ControlToggleButton';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

import { useCourseStore } from '@/stores/useCourseStore';

export default function CourseControlPanel() {
  const explosionLevel = useCourseStore((state) => state.explosionLevel);
  const setExplosionLevel = useCourseStore((state) => state.setExplosionLevel);
  const selectedPartId = useCourseStore((state) => state.selectedPartId);

  const viewMode = useCourseStore((state) => state.viewMode);
  const setViewMode = useCourseStore((state) => state.setViewMode);

  const transformMode = useCourseStore((state) => state.transformMode);
  const setTransformMode = useCourseStore((state) => state.setTransformMode);
  const selectedPartTransform = useCourseStore(
    (state) => state.selectedPartTransform
  );
  return (
    <div className="flex w-full flex-col">
      {/* View Mode Section */}
      <div className="flex flex-col gap-3 p-4">
        <h2 className="pl-1 text-base font-bold">쿼드콥터 드론 시스템</h2>
        <h2 className="text-base font-bold">View mode</h2>
        <div className="flex gap-2">
          <ControlToggleButton
            label="General"
            isActive={viewMode === 'general'}
            onClick={() => setViewMode('general')}
          />
          <ControlToggleButton
            label="Wireframe"
            isActive={viewMode === 'wireframe'}
            onClick={() => setViewMode('wireframe')}
          />
        </div>
      </div>

      {/* 분해 슬라이더 섹션 */}
      <div className="flex flex-col gap-3 border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">분해 슬라이더</h2>
          {selectedPartId && (
            <span className="text-xs text-red-500">
              전체 모델 뷰에서 조절 가능
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Slider
            value={explosionLevel}
            onValueChange={setExplosionLevel}
            max={100}
            step={1}
            disabled={!!selectedPartId}
            className={cn(
              'flex-1 **:data-[slot=slider-range]:bg-[#3469FF] **:data-[slot=slider-thumb]:border-0 **:data-[slot=slider-thumb]:bg-[#3469FF]',
              selectedPartId && 'cursor-not-allowed opacity-50'
            )}
          />
          <span
            className={cn(
              'w-10 text-right text-sm font-medium',
              selectedPartId && 'text-gray-400'
            )}
          >
            {explosionLevel[0]}%
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-200 p-4">
        <h2 className="text-base font-bold">부품 조작</h2>
        <div className="flex gap-2">
          <ControlToggleButton
            label="이동"
            isActive={transformMode === 'translate'}
            onClick={() => setTransformMode('translate')}
          />
          <ControlToggleButton
            label="회전"
            isActive={transformMode === 'rotate'}
            onClick={() => setTransformMode('rotate')}
          />
        </div>
        <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
          <div className="font-semibold text-gray-600">좌표</div>
          {selectedPartTransform ? (
            <div className="mt-1 grid grid-cols-3 gap-2 text-[11px]">
              <div>X {selectedPartTransform.x.toFixed(2)}</div>
              <div>Y {selectedPartTransform.y.toFixed(2)}</div>
              <div>Z {selectedPartTransform.z.toFixed(2)}</div>
            </div>
          ) : (
            <div className="mt-1 text-gray-500">선택된 부품 없음</div>
          )}
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
