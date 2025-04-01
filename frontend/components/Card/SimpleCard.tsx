import Image from "next/image";

interface Props {
  colSize: number;
  rowSize: number;
  image: string;
}

export const SimpleCard = ({ colSize = 1, rowSize = 1, image }: Props) => {
  return (
    <div
      style={{
        gridColumn: `span ${colSize} / span ${colSize}`,
        gridRow: `span ${rowSize} / span ${rowSize}`,
      }}
      className="relative rounded-md drop-shadow-md overflow-hidden group"
    >
      <Image src={image} alt="Image 1" layout="fill" objectFit="cover" />
      {/* Dégradé sombre par défaut, qui devient transparent au survol */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
      {/* Bordure dégradée dorée qui apparaît au survol */}
      <div className="absolute inset-0 rounded-md border-4 border-transparent group-hover:border-gradient-to-r group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-500"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <div className="text-xl font-bold">
          2.5 <b className="text-sm font-semibold">ETH</b>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <Image
            src={"/images/avatar.png"}
            alt="Creator Avatar"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm">@creator_name</span>
        </div>
        <div className="text-xs bg-stone-950 text-white px-2 py-1 rounded-md">
          Start in: 2025-04-10
        </div>
      </div>
    </div>
  );
};
