import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";

export default function Space() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "/assets/space/nx.png",
    "/assets/space/ny.png",
    "/assets/space/nz.png",
    "/assets/space/px.png",
    "/assets/space/py.png",
    "/assets/space/pz.png",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;

  //here you need to make it just return a flat thing with a pic on top.
}
