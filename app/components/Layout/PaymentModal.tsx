import { FC, useContext, useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { ErrorToast } from "../../utils/toast";
import { useRefundMutation } from "../../features/api/user-api";
import { AuthContext } from "../Auth/AuthProvider";
import { RiAddFill, RiMoneyEuroCircleLine } from "react-icons/ri";
import { paypalCardLogo, paypalLogo } from "../../constants/paypal.conts";
import { useTranslation } from "next-i18next";

const initialOptions = {
  "client-id": "AU0awvBN6LL7DE6jbfYTMtmqRXOwkJ6qnWniFEwhIdlBxIMNGb4XtoxmHE6mDMkvycY2X_oMH0doYrW9",
  currency: "EUR",
  intent: "capture",
};

interface PBProps {
  amount: string;
}

const MIN_AMOUNT = 10;

const PaypalButtons: FC<PBProps> = ({ amount }) => {
  const [refund] = useRefundMutation();
  const { refetch } = useContext(AuthContext);

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const { t } = useTranslation("layout");

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
      },
    });
  }, [amount]);

  if (amount === "" || parseFloat(amount) < MIN_AMOUNT) return null;
  return (
    <>
      {!isPending ? (
        <PayPalButtons
          style={{ color: "blue" }}
          createOrder={(data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (!actions?.order) return;
            return actions.order.capture().then((details) => {
              if (!details || details.status !== "COMPLETED")
                return ErrorToast(t("an_error_occured_during_transaction"));
              const total = details.purchase_units
                .map(({ amount }) => +amount.value)
                .reduce((total, actual) => total + actual);
              refund({ amount: total, orderId: data.orderID }).then(() => refetch());
            });
          }}
        />
      ) : (
        <div className="pb-[47px]">
          <div className="h-[55px] w-full bg-[#0070ba] mb-[17px] flex items-center justify-center">
            <img src={paypalLogo} className="h-[24px]" />
          </div>
          <div className="h-[55px] w-full bg-[#2C2E2F] flex items-center justify-center">
            <img src={paypalCardLogo} className="h-[24px]" />
          </div>
        </div>
      )}
    </>
  );
};

interface Props {
  onClose: () => void;
}

const PaymentModal: FC<Props> = ({ onClose }) => {
  const [amount, setAmount] = useState<string>("");
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation("layout");

  if (!user) return null;
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
                    <RiMoneyEuroCircleLine className="text-gray-darker" size={50} />
                  </div>
                </div>
                <div className="flex-1 flex flex-col space-y-2">
                  <div className="text-3xl font-bold mb-8">{t("add_funds")}</div>
                  <div className="p-4 bg-red-jalapeno text-white flex flex-row items-center justify-between">
                    <div className="flex flex-col justify-between">
                      <div className="text-4xl font-medium">{user.balance.toFixed(2)}</div>
                      <div>{t("current_balance")}</div>
                    </div>
                    <div>
                      <RiMoneyEuroCircleLine size={70} />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <RiAddFill className="text-black/50" size={50} />
                  </div>
                  <div className="flex flex-row pb-8">
                    <div className="w-[5px] h-full bg-red-jalapeno"></div>
                    <div className="flex-1 p-4 bg-gray-light text-black/50 flex flex-row items-center justify-between">
                      <div className="flex flex-col justify-between">
                        <input
                          min={MIN_AMOUNT}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="10.05"
                          className="text-4xl font-medium w-1/3 bg-transparent outline-none border-b border-b-red-jalapeno"
                          type="number"
                        />
                        <div>{t("amount_to_add")}</div>
                      </div>
                      <div>
                        <RiMoneyEuroCircleLine size={70} />
                      </div>
                    </div>
                  </div>
                  <PayPalScriptProvider
                    options={{
                      ...initialOptions,
                      locale: i18n.language === "fr" ? "fr_FR" : "en_GB",
                    }}
                  >
                    <PaypalButtons amount={amount} />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
