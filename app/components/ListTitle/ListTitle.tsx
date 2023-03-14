import { FC } from "react";

interface ListTitleProps {
  title: string;
}

const ListTitle: FC<ListTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-row space-x-1">
      <div className="flex w-2 bg-red-jalapeno" />
      <div className="font-bold text-3xl">{title}</div>
    </div>
  );
};

export default ListTitle;
