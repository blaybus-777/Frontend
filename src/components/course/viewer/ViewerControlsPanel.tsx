interface ViewerControlsPanelProps {
  explodeDistance: number;
  explodeSpace: 'local' | 'world';
  onChangeDistance: (value: number) => void;
  onChangeSpace: (value: 'local' | 'world') => void;
}

export default function ViewerControlsPanel({
  explodeDistance,
  explodeSpace,
  onChangeDistance,
  onChangeSpace,
}: ViewerControlsPanelProps) {
  return (
    <div className="border-foundation-gray-4 text-foundation-black-text flex h-full w-full flex-col gap-6 rounded-sm border bg-white p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">마우스 조작</h3>
        <div className="text-xs leading-5 text-gray-600">
          <div>스크롤: 줌 인/아웃</div>
          <div>우클릭 드래그: 화면 회전</div>
          <div>좌클릭 드래그: 화면 이동</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">부품 분해도</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChangeSpace('local')}
            className={`rounded-sm border px-3 py-1 text-xs ${
              explodeSpace === 'local'
                ? 'bg-foundation-black-text border-foundation-black-text text-white'
                : 'text-foundation-black-text border-foundation-gray-4 bg-white'
            }`}
          >
            로컬 좌표
          </button>
          <button
            type="button"
            onClick={() => onChangeSpace('world')}
            className={`rounded-sm border px-3 py-1 text-xs ${
              explodeSpace === 'world'
                ? 'bg-foundation-black-text border-foundation-black-text text-white'
                : 'text-foundation-black-text border-foundation-gray-4 bg-white'
            }`}
          >
            월드 좌표
          </button>
        </div>
        <div className="flex items-center gap-3">
          <input
            className="w-full"
            type="range"
            min={0}
            max={2}
            step={0.05}
            value={explodeDistance}
            onChange={(event) => onChangeDistance(Number(event.target.value))}
          />
          <span className="w-10 text-right text-xs">
            {explodeDistance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
