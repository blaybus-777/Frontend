import { Canvas } from '@react-three/fiber';
import { Stage, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

interface ModelThumbnailProps {
  modelUrl: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} rotation={[Math.PI / 8, Math.PI / 4, 0]} />;
}

export default function ModelThumbnail({ modelUrl }: ModelThumbnailProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          preserveDrawingBuffer: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <Stage
            intensity={0.5}
            environment="city"
            adjustCamera={1.2} // Slightly zoom out to fit nicely
          >
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
}
