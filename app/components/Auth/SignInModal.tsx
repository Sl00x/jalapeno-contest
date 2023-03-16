import { FC, useContext, useState } from "react";
import { RiLoginCircleLine, RiTicket2Line } from "react-icons/ri";
import { AuthContext } from "./AuthProvider";

interface SignInModalProps {
  onClose: () => void;
}

const SignInModal: FC<SignInModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("benjamin.rousseliere@gmail.com");
  const [password, setPassword] = useState("testtest");
  const { loginUser, loading } = useContext(AuthContext);
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-y-auto" onClick={onClose}>
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-row space-x-6">
                <div>
                  <div className="bg-gray-light p-5">
                    <RiLoginCircleLine className="text-gray-darker" size={50} />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="text-3xl font-bold">Connexion</div>
                  <div>
                    Connectez-vous pour participer aux concours et accéder aux concours auxquels
                    vous avez participés !
                  </div>
                </div>
              </div>
              <div className="mt-4 w-full flex flex-col">
                <label className="text-black/40 mb-1">Adresse e-mail</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-1 border border-black/5 outline-none focus:outline-1 focus:outline-red-jalapeno mb-4"
                />
                <label className="text-black/40 mb-1">Mot de passe</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full px-2 py-1 border border-black/5 outline-none focus:outline-1 focus:outline-red-jalapeno"
                />
              </div>
            </div>
            <div
              onClick={() => {
                void loginUser(email, password, {
                  onSuccess: () => {
                    onClose();
                  },
                });
              }}
              className="bg-red-jalapeno text-white w-full text-center mt-2 py-4 cursor-pointer flex flex-row items-center justify-center space-x-2"
            >
              <RiTicket2Line size={20} />
              <div className="font-medium">se connecter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
