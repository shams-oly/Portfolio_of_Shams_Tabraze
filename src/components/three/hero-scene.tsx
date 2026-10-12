"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Image, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Props = { icons: string[]; dark: boolean };

function Core({ dark }: { dark: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial & { distort: number }>(null);
  const hover = useRef(0);
  useFrame((state, dt) => {
    if (!mesh.current || !mat.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.12;
    mesh.current.rotation.y = t * 0.18;
    hover.current = THREE.MathUtils.damp(hover.current, Math.hypot(state.pointer.x, state.pointer.y) < 0.35 ? 1 : 0, 4, dt);
    mat.current.distort = 0.32 + hover.current * 0.22 + Math.sin(t * 0.6) * 0.05;
  });
  return (
    <mesh ref={mesh} scale={1.35}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial
        ref={mat as never}
        color={dark ? "#d9d4ff" : "#ffffff"}
        roughness={0.08}
        metalness={dark ? 0.55 : 0.25}
        clearcoat={1}
        clearcoatRoughness={0.1}
        iridescence={1}
        iridescenceIOR={1.6}
        iridescenceThicknessRange={[200, 900]}
        envMapIntensity={dark ? 1.4 : 1.1}
        distort={0.35}
        speed={1.6}
      />
    </mesh>
  );
}

function IconRing({ icons }: { icons: string[] }) {
  const group = useRef<THREE.Group>(null);
  const radius = 2.9;
  const items = useMemo(
    () =>
      icons.map((url, i) => {
        const a = (i / icons.length) * Math.PI * 2;
        return { url, a, y: Math.sin(i * 1.7) * 0.55 };
      }),
    [icons],
  );
  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.12;
    // face camera
    group.current.children.forEach((c) => c.lookAt(state.camera.position));
  });
  return (
    <group ref={group} rotation={[0.18, 0, -0.08]}>
      {items.map(({ url, a, y }) => (
        <Float key={url} speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
          <Image url={url} position={[Math.cos(a) * radius, y, Math.sin(a) * radius]} scale={0.62} radius={0.22} zoom={1.22} transparent toneMapped={false} />
        </Float>
      ))}
    </group>
  );
}

/** Shifts the composition right/up on wide screens so the name has room. */
function Stage({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const wide = viewport.aspect > 1.1;
  const s = wide ? 0.82 : 0.5;
  return (
    <group position={wide ? [viewport.width * 0.2, 0.55, 0] : [0, viewport.height * 0.24, 0]} scale={s}>
      {children}
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, dt) => {
    const scroll = typeof window !== "undefined" ? Math.min(1, window.scrollY / window.innerHeight) : 0;
    target.set(state.pointer.x * 0.6, state.pointer.y * 0.4 - scroll * 1.2, 7 + scroll * 3);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.x, 3, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.y, 3, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.z, 3, dt);
    camera.lookAt(0, -scroll * 0.6, 0);
  });
  return null;
}

export default function HeroScene({ icons, dark }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.8]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={dark ? 0.2 : 0.6} />
          <Stage>
            <Core dark={dark} />
            <IconRing icons={icons} />
          </Stage>
          <Sparkles count={70} scale={[10, 6, 6]} size={2.2} speed={0.35} opacity={dark ? 0.6 : 0.35} color={dark ? "#c9b8ff" : "#6a4cff"} />
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={4} color="#2f6bff" position={[-5, 2, 3]} scale={[4, 6, 1]} />
            <Lightformer form="rect" intensity={4} color="#ff3d8b" position={[5, -1, 3]} scale={[4, 6, 1]} />
            <Lightformer form="ring" intensity={3} color="#8b3dff" position={[0, 4, -4]} scale={4} />
            <Lightformer form="rect" intensity={2} color="#c6ff3d" position={[0, -5, 2]} scale={[8, 1, 1]} />
            <Lightformer form="rect" intensity={dark ? 1 : 3} color="#ffffff" position={[0, 0, 6]} scale={[6, 6, 1]} />
          </Environment>
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  );
}
