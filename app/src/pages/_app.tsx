import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Layout } from "../../components/Layout/Layout";
import { RootStore } from "../../features/store/root-store";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import { RiCloseLine } from "react-icons/ri";

TimeAgo.addLocale(fr);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={RootStore}>
      <Toaster position="top-right">
        {(t) => (
          <ToastBar position="bottom-right" toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
