"use client";

import {
  Center,
  Float,
  RoundedBox,
  Text,
  Text3D,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";

type MenuButtonProps = {
  buttonText: string;
};

const MenuButton = ({ buttonText }: MenuButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  useCursor(hovered);

  const handleClick = () => {
    setClicked(true);
    setKey(1); // Increment the key to force remount
  };

  const box = useRef<THREE.Mesh>(null);
  const rotationSpeed = useMemo(() => Math.random() - 0.5, []); // Calculate once
  useFrame(() => {
    if (box.current && clicked) {
      box.current.rotation.x += rotationSpeed / 10;
      box.current.rotation.y += rotationSpeed / 10;
    }
  });

  return (
    <group>
      <RigidBody key={key} type={clicked ? "dynamic" : "fixed"}>
        <RoundedBox
          ref={box}
          args={[0.9, 0.35, 0.1]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={handleClick}
        >
          <meshLambertMaterial
            attach="material"
            color={hovered ? "hotpink" : "pink"}
          />
          <Center>
            <Text3D
              font={"./fonts/helvetiker_regular.typeface.json"}
              size={0.12}
              height={0.12}
              rotation-y={3.15}
              position-z={-0.03}
            >
              {buttonText}
              <meshNormalMaterial />
            </Text3D>
          </Center>
        </RoundedBox>
      </RigidBody>
    </group>
  );
};

export default MenuButton;
