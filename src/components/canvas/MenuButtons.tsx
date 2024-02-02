"use client";

import { Float, OrbitControls, RoundedBox } from "@react-three/drei";
import { Box, Flex } from "@react-three/flex";
import { Vector3 } from "three";
import MenuButton from "./MenuButton";
import { useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useRouter } from "next/navigation";

type MenuButtonProps = {
  position: number[];
  randomMeme: string | undefined;
};

const MenuButtons = ({ position, randomMeme }: MenuButtonProps) => {
  const vectorPosition = new Vector3().fromArray(position);
  const router = useRouter();
  const [linkClicked, setLinkClicked] = useState<boolean>(false);

  const transition = (link: string) => {
    setLinkClicked(true);
    console.log("trans");
    setTimeout(() => {
      router.push(link);
    }, 3000);
  };

  return (
    <Float rotationIntensity={0.2} floatingRange={[0, 0.02]}>
      <Flex position={vectorPosition}>
        <Box p={0.2}>
          <MenuButton
            buttonText="Play Now"
            link={`/game/${randomMeme}`}
            pageTransition={transition}
            linkClicked={linkClicked}
          />
        </Box>
        <Box p={0.2}>
          <MenuButton
            buttonText="Login"
            link={"/login"}
            pageTransition={transition}
            linkClicked={linkClicked}
          />
        </Box>
      </Flex>
    </Float>
  );
};

export default MenuButtons;
