import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LabFlow from '@/components/lab/LabFlow';

export default function LabPage() {
  return (
    <div className="mx-auto h-[calc(100vh-80px)] max-w-[1400px] bg-[linear-gradient(135deg,#F8FAFF_0%,#F3F4F6_40%,#EEF2FF_100%)] px-4 py-6">
      <ReactFlowProvider>
        <LabFlow />
      </ReactFlowProvider>
    </div>
  );
}
