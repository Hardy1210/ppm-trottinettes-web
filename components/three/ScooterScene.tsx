'use client';

import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type ScooterSceneProps = { modelUrl: string };

function ScooterModel({
  url,
  targetLight,
}: {
  url: string;
  targetLight: THREE.Vector3;
}) {
  const group = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  // ✅ SOLO luz con mouse (sin rotación, sin scroll, sin idle)
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.lerp(targetLight, 0.12);
    }
  });

  return (
    // ✅ tus valores (no los cambio)
    <group ref={group} position={[0, -1.0, 0]} scale={1.4}>
      <primitive object={scene} />
      <pointLight
        ref={lightRef}
        intensity={45}
        distance={10}
        decay={2}
        position={[2, 2, 2]}
        color="#ffffff"
      />
    </group>
  );
}

export default function ScooterScene({ modelUrl }: ScooterSceneProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const targetLight = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    targetLight.set(
      THREE.MathUtils.clamp(mouse.x * 3, -3, 3),
      THREE.MathUtils.clamp(1.2 + mouse.y * 2, -1, 3),
      2.2,
    );
  }, [mouse, targetLight]);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onPointerMove={(e) => {
        const rect = (
          e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        setMouse({ x, y });
      }}
    >
      <Canvas
        style={{ border: '1px solid red' }}
        shadows
        dpr={[1, 2]}
        // ✅ tus valores (no los cambio)
        camera={{ position: [-0.2, -0.65, 7], fov: 30, near: 0.01, far: 200 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />

        <directionalLight
          intensity={1.2}
          position={[-2, 3, 2]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          <ScooterModel url={modelUrl} targetLight={targetLight} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls enableZoom={false} />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.25, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.25} />
        </mesh>
      </Canvas>
    </div>
  );
}
