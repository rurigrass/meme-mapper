interface Text3dProps {
  primary: string;
  secondary: string;
  blocked?: boolean;
}

const Text3d = ({ primary, secondary, blocked }: Text3dProps) => {
  return (
    <div className="group relative cursor-pointer text-[8vw] leading-[8vw] font-extrabold transform-style-3d hover:rotate-x-90 duration-700 whitespace-nowrap">
      <p
        className={`text-purple-600 hover:-translate-y-full group-hover:opacity-0 duration-700 ${
          blocked && "hover:cursor-not-allowed"
        }`}
      >
        {primary}
      </p>
      <p
        className={`absolute top-0 text-yellow-400 -rotate-x-90 translate-y-[4vw] opacity-0 group-hover:opacity-100 duration-500 ${
          blocked && "text-gray-500 hover:cursor-not-allowed"
        }`}
      >
        {secondary}
      </p>
    </div>
  );
};

export default Text3d;
