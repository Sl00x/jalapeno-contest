import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Layout } from "../../components/Layout/Layout";
import { RootStore } from "../../features/store/root-store";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";

TimeAgo.addLocale(fr);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={RootStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
