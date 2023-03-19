import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../components/Auth/AuthProvider";
import getStaticTranslationProps from "../../../utils/translation";
import DashboardContent from "./dashboardContent";

export const getStaticProps = getStaticTranslationProps;

const Transactions: React.FC = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;
  return <DashboardContent />;
};

export default Transactions;
