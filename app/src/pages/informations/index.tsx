import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import getStaticTranslationProps from "../../../utils/translation";

export const getStaticProps = getStaticTranslationProps;

interface FormattedContentProps {
  texts: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({ texts }) => {
  return (
    <>
      {texts.split("\n").map((line) => {
        const [type, text] = line.split("|");
        if (type === "title") {
          return <div className="text-lg font-bold text-red-jalapeno">{text}</div>;
        } else if (type === "subtitle") {
          return <div className="text-base text-red-jalapeno-lighter">{text}</div>;
        }
        return <div className="text-sm">{text}</div>;
      })}
    </>
  );
};

const Informations: React.FC = () => {
  const [tab, setTab] = useState<number>(0);

  const { t } = useTranslation("informations");

  const infos = [
    { name: t("general_informations"), texts: t("general_informations_text") },
    { name: t("cgv"), texts: t("cgv_text") },
    { name: t("cgu"), texts: t("cgu_text") },
  ];

  return (
    <div className="p-8 flex flex-col space-y-8">
      <div className="flex flex-row items-center">
        {infos.map(({ name }, index) => (
          <div key={index} className="flex-1 flex justify-center">
            <div className="cursor-pointer" onClick={() => setTab(index)}>
              <div>{name}</div>
              <div
                className={clsx(
                  "mt-1 w-full h-0.5",
                  tab === index ? "bg-red-jalapeno-lighter" : "bg-transparent"
                )}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-4">
        {infos.map(({ texts }, index) => (
          <FormattedContent key={index} texts={texts} />
        ))}
      </div>
    </div>
  );
};

export default Informations;
