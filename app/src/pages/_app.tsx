import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Layout } from "../../components/Layout/Layout";
import { RootStore } from "../../features/store/root-store";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";
import { Toaster, ToastBar } from "react-hot-toast";
import { AuthProvider } from "../../components/Auth/AuthProvider";

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
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  );
}
