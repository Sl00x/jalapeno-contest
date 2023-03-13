import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react"
import { RiArrowLeftSLine, RiGameLine, RiGiftLine, RiListCheck, RiMoneyEuroCircleLine, RiSearchLine } from 'react-icons/ri';
import { menus } from "../../constants/menu.const";
interface Props {
    children?: ReactElement | ReactElement[];
    searchBar?: boolean;
}
export const Layout: React.FC<Props> = ({
    children,
    searchBar
}) => {


    const router = useRouter();
    const [currentPath, setCurrentPath] = useState('/');




    useEffect(() => {
        setCurrentPath(router.pathname)
    }, [router.pathname])

    return (
        <div className="relative w-screen h-screen bg-white flex fex-row overflow-x-hidden">
            <div className="absolute md:relative w-full md:w-[320px] h-full bg-red-jalapeno border-r border-black/[0.1] flex flex-col justify-between">

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
                                <>
                                    {item.path === currentPath
                                        ?
                                        <div key={index} className="cursor-pointer flex justify-between items-center bg-gradient-to-l from-red-jalapeno to-red-jalapeno-dark w-full py-4 px-4 hover:from-red-jalapeno-light hover:to-red-jalapeno-light">
                                            <span className="h-full text-lg font-semibold text-white">{item.name}</span>
                                            <item.icon color="white" size={20} className="mr-2" />
                                        </div>
                                        :
                                        <div key={index} className="cursor-pointer flex justify-between items-center w-full py-4 px-4 hover:bg-red-jalapeno-light">
                                            <span className="h-full text-lg font-semibold text-white">{item.name}</span>
                                            <item.icon color="white" size={20} className="mr-2" />
                                        </div>
                                    }

                                </>

                            ))}
                        </>

                    </div>
                </div>
                <div className="border-t border-white/5 p-4">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-white font-semibold text-xl">Quenn Alexis</span>
                            <span className="text-white/50  text-md cursor-pointer">Se déconnecter</span>
                        </div>
                        <div className="bg-white/30 flex flex-row items-center px-2 py-1 gap-2">
                            <span className="text-white font-semibold text-xl">0.00</span>
                            <RiMoneyEuroCircleLine color="white" size={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 h-screen w-full overflow-y-auto">
                {searchBar &&
                    <div className="w-full border-b border-black/[0.025] bg-black/[0.025] flex flex-row items-center gap-2 p-2">
                        <RiSearchLine className="text-black/[0.17]" size={24} />
                        <input placeholder="Rechercher..." className="text-lg text-black/[0.3] bg-black/[0] outline-none w-full" />
                    </div>
                }
                {children}
            </div>
        </div>
    )
}