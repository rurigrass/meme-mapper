import { Float, OrbitControls, RoundedBox } from "@react-three/drei";
import { Box, Flex } from "@react-three/flex";
import { Vector3 } from "three";
import MenuButton from "./MenuButton";

type MenuButtonProps = {
  position: number[];
};

const MenuButtons = ({ position }: MenuButtonProps) => {
  const vectorPosition = new Vector3().fromArray(position);

  return (
    <Float rotationIntensity={0.3} position={vectorPosition}>
      <Flex>
        <Box p={0.2}>
          <MenuButton buttonText="Play Now" />
        </Box>
        <Box p={0.2}>
          <MenuButton buttonText="Login" />
        </Box>
      </Flex>
    </Float>
  );
};

export default MenuButtons;
