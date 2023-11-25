interface ScoreBoxProps {
  title: string;
  primary?: number;
  secondary?: number;
}

const ScoreBox = ({ title, primary, secondary }: ScoreBoxProps) => {
  return (
    <div className="flex flex-col w-full border-solid  border-[1px] border-yellow-500 rounded-md">
      <div className="ml-2">{title}</div>
      <div className="flex justify-center text-4xl md:text-6xl mt-2 mb-5">
        {primary}
        {title === "Levels played" && <p>/{secondary}</p>}
      </div>
    </div>
  );
};

export default ScoreBox;
