"use client";

import { Center, Float, RoundedBox, Text3D } from "@react-three/drei";
import { Box, Flex } from "@react-three/flex";
import { Vector3 } from "three";
import MenuButton from "./MenuButton";
import { Suspense, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useRouter } from "next/navigation";
import MenuButtonLoading from "./MenuButtonLoading";
import { useRandomMeme } from "@/lib/hooks/useRandomMeme";
import { useSession } from "next-auth/react";

type MenuButtonProps = {
  position: number[];
  // randomMeme: string | undefined;
};

const MenuButtons = ({ position }: MenuButtonProps) => {
  const vectorPosition = new Vector3().fromArray(position);
  const router = useRouter();
  const [linkClicked, setLinkClicked] = useState<boolean>(false);
  const { data: randomMeme } = useRandomMeme("");
  const { data: session } = useSession();

  const transition = (link: string) => {
    setLinkClicked(true);
    setTimeout(() => {
      router.push(link);
    }, 2500);
  };

  return (
    <Float rotationIntensity={0.2} floatingRange={[0, 0.02]}>
      <Flex position={vectorPosition}>
        <Box p={0.225}>
          {!randomMeme ? (
            <MenuButtonLoading
              buttonText="Play Now"
              linkClicked={linkClicked}
            />
          ) : (
            <MenuButton
              buttonText="Play Now"
              link={`/game/${randomMeme}`}
              pageTransition={transition}
              linkClicked={linkClicked}
            />
          )}
        </Box>
        <Box p={0.225}>
          <MenuButton
            buttonText="Submit Meme"
            link={"/request"}
            pageTransition={transition}
            linkClicked={linkClicked}
          />
        </Box>
        {!session ? (
          <Box p={0.225}>
            <MenuButton
              buttonText="Login"
              link={"/login"}
              pageTransition={transition}
              linkClicked={linkClicked}
            />
          </Box>
        ) : (
          <Box p={0.225}>
            <MenuButton
              buttonText="Profile"
              link={`/user/${session.user.id}`}
              pageTransition={transition}
              linkClicked={linkClicked}
            />
          </Box>
        )}
      </Flex>
    </Float>
  );
};

export default MenuButtons;
