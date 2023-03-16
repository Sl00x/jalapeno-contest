import { FC, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ErrorToast } from "../../utils/toast";
import { useRefundMutation } from "../../features/api/user-api";
import { AuthContext } from "../Auth/AuthProvider";

const initialOptions = {
  "client-id": "AU0awvBN6LL7DE6jbfYTMtmqRXOwkJ6qnWniFEwhIdlBxIMNGb4XtoxmHE6mDMkvycY2X_oMH0doYrW9",
  currency: "EUR",
  intent: "capture",
};

interface Props {
  onClose: () => void;
}

const PaymentModal: FC<Props> = ({ onClose }) => {
  const [refund] = useRefundMutation();
  const { refetch } = useContext(AuthContext);

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
              <PayPalScriptProvider options={{ ...initialOptions }}>
                <PayPalButtons
                  style={{ color: "blue" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "100",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    if (!actions?.order) return;
                    return actions.order.capture().then((details) => {
                      if (!details || details.status !== "COMPLETED")
                        return ErrorToast("Une erreur est survenue durant la transaction");
                      const total = details.purchase_units
                        .map(({ amount }) => +amount.value)
                        .reduce((total, actual) => total + actual);
                      refund({ amount: total }).then(() => refetch());
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
