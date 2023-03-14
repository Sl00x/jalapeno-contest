import { FC, useState } from "react";
import {
  RiLoginCircleLine,
  RiRegisteredLine,
  RiTicket2Line,
} from "react-icons/ri";

interface SignInModalProps {
  onClose: () => void;
}

const SignUpModal: FC<SignInModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
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
                    <RiRegisteredLine className="text-gray-darker" size={50} />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="text-3xl font-bold">Inscription</div>
                  <div>
                    Profitez de nombreux avantage avec {"l'inscription"}.
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

                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col w-full">
                    <label className="text-black/40 mb-1">Nom</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-2 py-1 border border-black/5 outline-none focus:outline-1 focus:outline-red-jalapeno mb-4"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="text-black/40 mb-1">Prénom</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="w-full px-2 py-1 border border-black/5 outline-none focus:outline-1 focus:outline-red-jalapeno mb-4"
                    />
                  </div>
                </div>
                <label className="text-black/40 mb-1">Date de naissance</label>
                <input
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  type="date"
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
            <div className="bg-red-jalapeno text-white w-full text-center mt-2 py-4 cursor-pointer flex flex-row items-center justify-center space-x-2">
              <RiTicket2Line size={20} />
              <div className="font-medium">{"S'inscrire"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
