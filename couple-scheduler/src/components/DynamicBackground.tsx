import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useWindowSize } from "react-use";
import { motionSettings } from "../lib/motionConfig";

let VANTA: any = null;

function Nebula() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      ];
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * motionSettings.nebula.rotationSpeed;
    meshRef.current.rotation.x = t * (motionSettings.nebula.rotationSpeed * 0.4);
    // @ts-ignore: custom uniform on shader material
    meshRef.current.material.uniforms.uTime.value = t;
    // @ts-ignore: custom uniform on shader material
    meshRef.current.material.uniforms.uMouse.value = new THREE.Vector2(...mouse.current);
  });

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      float n = sin(uv.x * 10.0 + uTime) * sin(uv.y * 10.0 + uTime);
      float d = distance(uv, uMouse * 0.5 + 0.5);
      n += smoothstep(0.2, 0.0, d) * 0.5;
      vec3 col = mix(vec3(0.0, 0.2, 0.4), vec3(0.4, 0.0, 0.8), n);
      gl_FragColor = vec4(col, 0.8);
    }
  `;

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function DynamicBackground({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowSize();
  const [useVanta, setUseVanta] = useState(false);
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) setUseVanta(true);
    canvas.remove();
  }, []);

  useEffect(() => {
    if (useVanta && typeof window !== "undefined") {
      import("vanta/dist/vanta.waves.min").then((module) => {
        VANTA = module.default;
        vantaRef.current = VANTA({
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: parseInt(motionSettings.vantaFallback.color.slice(1), 16),
          waveHeight: motionSettings.vantaFallback.waveHeight,
          shininess: motionSettings.vantaFallback.shininess,
        });
      });
    }
    return () => {
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, [useVanta]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {!useVanta && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ position: "fixed", inset: 0, zIndex: 0 }}
        >
          <Suspense fallback={null}>
            <Nebula />
          </Suspense>
          <Stars radius={30} depth={50} count={2000} factor={4} saturation={0} fade />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      )}

      {useVanta && <div id="vanta-bg" className="fixed inset-0 -z-10" />}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
