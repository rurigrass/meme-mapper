"use client";

import { Center, RoundedBox, Text, Text3D, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

type MenuButtonProps = {
  buttonText: string;
};

const MenuButton = ({ buttonText }: MenuButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  useCursor(hovered);
  const box = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (box.current && clicked) {
      box.current.rotation.x += 0.2;
    }
  });

  return (
    <RoundedBox
      ref={box}
      args={[0.9, 0.35, 0.1]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <meshLambertMaterial
        attach="material"
        color={hovered ? "hotpink" : "pink"}
      />
      <Center>
        <Text3D
          font={"./fonts/helvetiker_regular.typeface.json"}
          size={0.12}
          rotation-y={3.15}
        >
          {buttonText}
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </RoundedBox>
  );
};

export default MenuButton;
