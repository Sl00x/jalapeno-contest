import toast from "react-hot-toast";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

export const SuccessToast = (message: string) => {
  toast(message, {
    icon: (
      <div className="p-2 bg-[#b8e994]/70 text-[#78e08f]">
        <RiCheckLine />
      </div>
    ),
    duration: 2000,
    style: {
      backgroundColor: "white",
      color: "black",
      borderRadius: 0,
    },
  });
};

export const ErrorToast = (message: string) => {
  toast(message, {
    icon: (
      <div className="p-2 text-red-jalapeno">
        <RiCloseLine />
      </div>
    ),
    duration: 2000,
    style: {
      backgroundColor: "white",
      color: "black",
      borderRadius: 0,
    },
  });
};
