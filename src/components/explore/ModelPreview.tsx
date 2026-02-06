import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { type PropsWithChildren, useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  urls: string[];
}

function Model({ url, position }: { url: string; position: [number, number, number] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} />;
}
function FitCamera({ children }: PropsWithChildren<unknown>) {
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!ref.current) return;

    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    ref.current.position.sub(center);

    const distance = size * 0.4;

    camera.position.set(distance, distance, distance);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return <group ref={ref}>{children}</group>;
}

export default function ModelPreview({ urls }: Props) {
  const radius = 0.3; 

  return (
    <Canvas camera={{ fov: 45 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} />
      <Environment preset="studio" />

      <FitCamera>
        {urls.map((url, i) => {
          const angle = (i / urls.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <Model
              key={url}
              url={url}
              position={[x, 0, z]}
            />
          );
        })}
      </FitCamera>

      <OrbitControls autoRotate enableZoom={true} />
    </Canvas>
  );
}
