import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Layout } from "../../components/Layout/Layout";
import { RootStore } from "../../features/store/root-store";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";
import enGB from "javascript-time-ago/locale/en-GB.json";
import { Toaster, ToastBar } from "react-hot-toast";
import { AuthProvider } from "../../components/Auth/AuthProvider";
import { appWithTranslation } from "next-i18next";

TimeAgo.addLocale(fr);
TimeAgo.addLocale(enGB);

const App = ({ Component, pageProps }: AppProps) => {
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
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  );
};

export default appWithTranslation(App);
