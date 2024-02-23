import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useRef } from "react";
import { Mesh } from "three";

const Clouds = () => {
  const cloudsRef = useRef<Mesh>(null); // Specify Mesh as the type and provide an initial value
  const [cloudsTexture] = useTexture(["/assets/planets/earth_clouds.jpeg"]);

  useFrame(() => {
    // Check if cloudsRef.current is not null before accessing its properties
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh
      ref={cloudsRef}
      scale={1.01}
      // position={position}
      //x should be 10
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial alphaMap={cloudsTexture} transparent={true} />
    </mesh>
  );
};

export default memo(Clouds);
