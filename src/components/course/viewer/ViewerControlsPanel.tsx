interface ViewerControlsPanelProps {
  explodeDistance: number;
  explodeSpace: "local" | "world";
  onChangeDistance: (value: number) => void;
  onChangeSpace: (value: "local" | "world") => void;
}

export default function ViewerControlsPanel({
  explodeDistance,
  explodeSpace,
  onChangeDistance,
  onChangeSpace,
}: ViewerControlsPanelProps) {
  return (
    <div className="h-full w-full bg-white border border-foundation-gray-4 rounded-sm p-4 flex flex-col gap-6 text-foundation-black-text">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">마우스 조작</h3>
        <div className="text-xs text-gray-600 leading-5">
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
            onClick={() => onChangeSpace("local")}
            className={`px-3 py-1 text-xs rounded-sm border ${
              explodeSpace === "local"
                ? "bg-foundation-black-text text-white border-foundation-black-text"
                : "bg-white text-foundation-black-text border-foundation-gray-4"
            }`}
          >
            로컬 좌표
          </button>
          <button
            type="button"
            onClick={() => onChangeSpace("world")}
            className={`px-3 py-1 text-xs rounded-sm border ${
              explodeSpace === "world"
                ? "bg-foundation-black-text text-white border-foundation-black-text"
                : "bg-white text-foundation-black-text border-foundation-gray-4"
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
          <span className="text-xs w-10 text-right">{explodeDistance.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
