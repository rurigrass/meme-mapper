interface Text3dProps {
  primary: string;
  secondary: string;
}

const Text3d = ({ primary, secondary }: Text3dProps) => {
  return (
    <div className="relative text-[8vw] font-extrabold transform-style-3d hover:rotate-x-90 hover:cursor-pointer transition duration-300 ">
      <p className="text-purple-600">{primary}</p>
      <p className="absolute -top-10 text-yellow-400 transform-style-3d -rotate-x-90 origin-bottom translate-y-[4vw] ">
        {/*  */}
        {secondary}
      </p>
    </div>
  );
};

export default Text3d;
