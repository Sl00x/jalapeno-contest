const SmokeyText = ({ text }: { text: string }) => {
  return (
    <h1 className="text-6xl font-extrabold text-white relative inline-block">
      <span className="absolute top-1 left-1 text-purple-700">{text}</span>
      <span className="absolute top-2 left-2 text-purple-700">{text}</span>
      <span className="absolute top-3 left-3 text-purple-700">{text}</span>
      <span className="relative">{text}</span>
    </h1>
  );
};

export default SmokeyText;
