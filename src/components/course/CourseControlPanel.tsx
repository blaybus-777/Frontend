import { ControlToggleButton } from './ControlToggleButton';
import { Slider } from '@/components/ui/slider';

import { useCourseStore } from '@/stores/useCourseStore';

export default function CourseControlPanel() {
  const explosionLevel = useCourseStore((state) => state.explosionLevel);
  const setExplosionLevel = useCourseStore((state) => state.setExplosionLevel);

  const viewMode = useCourseStore((state) => state.viewMode);
  const setViewMode = useCourseStore((state) => state.setViewMode);

  const assemblyMode = useCourseStore((state) => state.assemblyMode);
  const setAssemblyMode = useCourseStore((state) => state.setAssemblyMode);

  return (
    <div className="flex w-full flex-col">
      {/* Assembly Mode Section */}
      <div className="flex flex-col gap-3 border-b border-gray-200 p-4">
        <h2 className="pl-1 text-base font-bold">쿼드콥터 드론 시스템</h2>
        <div className="flex gap-2">
          <ControlToggleButton
            label="단일 부품"
            isActive={assemblyMode === 'single'}
            onClick={() => setAssemblyMode('single')}
          />
          <ControlToggleButton
            label="조립도"
            isActive={assemblyMode === 'assembly'}
            onClick={() => setAssemblyMode('assembly')}
          />
        </div>
      </div>

      {/* View Mode Section */}
      <div className="flex flex-col gap-3 p-4">
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
      {assemblyMode === 'assembly' && (
        <div className="flex flex-col gap-3 border-t border-gray-200 p-4">
          <h2 className="text-base font-bold">분해 슬라이더</h2>
          <div className="flex items-center gap-4">
            <Slider
              value={explosionLevel}
              onValueChange={setExplosionLevel}
              max={100}
              step={1}
              className="flex-1 **:data-[slot=slider-range]:bg-[#3469FF] **:data-[slot=slider-thumb]:border-0 **:data-[slot=slider-thumb]:bg-[#3469FF]"
            />
            <span className="w-10 text-right text-sm font-medium">
              {explosionLevel[0]}%
            </span>
          </div>
        </div>
      )}
      <div className=""></div>
    </div>
  );
}
