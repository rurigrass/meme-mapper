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
  link: string;
  pageTransition: (link: string) => void;
  linkClicked: boolean;
};

const MenuButton = ({
  buttonText,
  link,
  pageTransition,
  linkClicked,
}: MenuButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  useCursor(hovered);

  useEffect(() => {
    if (linkClicked === true && clicked === false) {
      setClicked(true), setKey(1);
    }
  }, [linkClicked]);

  console.log(buttonText, "LINK CLICKED ", linkClicked, "CLICKED ", clicked);

  const handleClick = () => {
    if (!linkClicked) {
      setClicked(true);
      setKey(1); // Increment the key to force remount
      pageTransition(link);
    }
  };

  const box = useRef<THREE.Mesh>(null);
  const rotationSpeed = useMemo(() => Math.random() - 0.5, []); // Calculate once
  useFrame(() => {
    if (box.current && clicked) {
      box.current.rotation.x += rotationSpeed / 50;
      box.current.rotation.y += rotationSpeed / 50;
    }
  });

  return (
    // <group>
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
    // </group>
  );
};

export default MenuButton;
