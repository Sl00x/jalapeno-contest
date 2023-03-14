import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { RiGiftLine } from "react-icons/ri";
import { menus } from "../../constants/menu.const";
import { SignBox } from "./SignBox";
import SignInModal from "../Auth/SignInModal";
import SignUpModal from "../Auth/SignUpModal";

interface Props {
  children?: ReactElement | ReactElement[];
}

export const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("/");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  return (
    <div className="relative w-screen h-screen bg-white flex fex-row overflow-x-hidden">
      {showLoginModal && (
        <SignInModal onClose={() => setShowLoginModal(false)} />
      )}
      {showRegisterModal && (
        <SignUpModal onClose={() => setShowRegisterModal(false)} />
      )}
      <div className="absolute md:relative w-full md:w-[270px] h-full bg-red-jalapeno border-r border-black/[0.1] flex flex-col justify-between">
        <div>
          <div className="flex flex-row justify-between p-4 items-center">
            <div></div>
            <div className="flex flex-row gap-2 items-center">
              <RiGiftLine color="white" size={46} />
              <span className="text-white text-3xl font-bold">Jalapeno</span>
            </div>
            {/*<div className="w-10 h-10 bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10">
                            <RiArrowLeftSLine color="white" size={20} />
                        </div>*/}
            <div></div>
          </div>
          <div className="flex flex-col mt-10">
            <>
              {menus.map((item, index) => (
                <div key={index}>
                  {item.path === currentPath ? (
                    <div className="cursor-pointer flex justify-between items-center bg-gradient-to-l from-red-jalapeno to-red-jalapeno-dark w-full py-4 px-4 hover:from-red-jalapeno-light hover:to-red-jalapeno-light">
                      <span className="h-full text-lg font-semibold text-white">
                        {item.name}
                      </span>
                      <item.icon color="white" size={20} className="mr-2" />
                    </div>
                  ) : (
                    <div className="cursor-pointer flex justify-between items-center w-full py-4 px-4 hover:bg-red-jalapeno-light">
                      <span className="h-full text-lg font-semibold text-white">
                        {item.name}
                      </span>
                      <item.icon color="white" size={20} className="mr-2" />
                    </div>
                  )}
                </div>
              ))}
            </>
          </div>
        </div>
        <SignBox
          onLoginClick={() => setShowLoginModal(true)}
          onRegisterClick={() => setShowRegisterModal(true)}
        />
      </div>
      <div className="flex-1 h-screen w-full overflow-y-auto">{children}</div>
    </div>
  );
};
