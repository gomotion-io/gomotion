import {
  Environment,
  MeshTransmissionMaterial,
  Text,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh } from "three";
import { useMediaQuery } from "usehooks-ts";

function Model({ isMobile }: { isMobile: boolean }) {
  const { nodes } = useGLTF("/models/torrus.glb");
  const { viewport } = useThree();
  const torus = useRef<Mesh>(null);

  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.x += 0.02;
    }
  });

  const groupScale = useMemo(() => (isMobile ? 2 : 3.5), [isMobile]);

  return (
    <group scale={viewport.width / groupScale}>
      <Text
        font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0, -1]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        GOMOTION
      </Text>
      <mesh ref={torus} {...nodes.Torus002}>
        <MeshTransmissionMaterial
          thickness={1.5}
          roughness={0.5}
          transmission={1}
          ior={1}
          chromaticAberration={0.02}
        />
      </mesh>
    </group>
  );
}

export const Scene = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Canvas style={{ background: "#000000" }} className="scene">
      <Model isMobile={isMobile} />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />
    </Canvas>
  );
};
