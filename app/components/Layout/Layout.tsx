import { useRouter } from "next/router";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { RiGiftLine } from "react-icons/ri";
import { MenuItem, menus } from "../../constants/menu.const";
import { SignBox } from "./SignBox";
import SignInModal from "../Auth/SignInModal";
import SignUpModal from "../Auth/SignUpModal";
import { AuthContext, useAuth } from "../Auth/AuthProvider";
import { ProfilBox } from "./ProfilBox";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const gb_uri = "/united-kingdom.png";
const fr_uri = "/france.png";

interface MenuListProps {
  menus: MenuItem[];
  currentPath: string;
  position: "top" | "bottom";
}

const MenuList: React.FC<MenuListProps> = ({ menus, position, currentPath }) => {
  const { user } = useAuth();
  const { t } = useTranslation("layout");
  const router = useRouter();

  return (
    <div>
      {menus
        .filter(
          ({ authRequired = false, position: p = "top" }) =>
            (!authRequired || user !== undefined) && position === p
        )
        .map((item, index) => (
          <div
            key={index}
            className={clsx(
              "cursor-pointer flex justify-between items-center py-4 px-4",
              item.path === currentPath
                ? "bg-gradient-to-l from-red-jalapeno to-red-jalapeno-dark w-full hover:from-red-jalapeno-light hover:to-red-jalapeno-light"
                : "hover:bg-red-jalapeno-light"
            )}
            onClick={() => router.push(item.path)}
          >
            <span className="h-full text-lg font-semibold text-white">{t(item.name)}</span>
            <item.icon color="white" size={20} className="mr-2" />
          </div>
        ))}
    </div>
  );
};

interface Props {
  children?: ReactElement | ReactElement[];
}

export const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("/");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user } = useContext(AuthContext);

  const { i18n } = useTranslation("layout");

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  return (
    <div className="relative w-screen h-screen bg-white flex fex-row overflow-x-hidden">
      {showLoginModal && <SignInModal onClose={() => setShowLoginModal(false)} />}
      {showRegisterModal && <SignUpModal onClose={() => setShowRegisterModal(false)} />}
      <div className="absolute md:relative w-full md:w-[320px] h-full bg-red-jalapeno border-r border-black/[0.1] flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-row justify-between p-4 items-center">
            <div>
              <Link
                href={{ pathname: router.pathname, query: router.query }}
                as={router.asPath}
                locale={i18n.language === "fr" ? "en" : "fr"}
              >
                <img src={i18n.language === "fr" ? fr_uri : gb_uri} className="w-8 h-8" />
              </Link>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <RiGiftLine color="white" size={46} />
              <span className="text-white text-3xl font-bold">Jalapeno</span>
            </div>
            {/*<div className="w-10 h-10 bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10">
                <RiArrowLeftSLine color="white" size={20} />
            </div>*/}
            <div></div>
          </div>
          <div className="flex-1 flex flex-col mt-10 justify-between">
            <MenuList currentPath={currentPath} menus={menus} position={"top"} />
            <MenuList currentPath={currentPath} menus={menus} position={"bottom"} />
          </div>
        </div>
        {user ? (
          <ProfilBox />
        ) : (
          <SignBox
            onLoginClick={() => setShowLoginModal(true)}
            onRegisterClick={() => setShowRegisterModal(true)}
          />
        )}
      </div>
      <div className="flex-1 h-screen w-full overflow-y-auto">{children}</div>
    </div>
  );
};
