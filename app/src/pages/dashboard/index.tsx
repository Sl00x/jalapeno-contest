import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Auth/AuthProvider";
import {
  RiAddLine,
  RiArrowLeftLine,
  RiCloseLine,
  RiFileCopyLine,
  RiLoaderLine,
  RiRefund2Line,
} from "react-icons/ri";
import Transaction from "../../../features/models/transaction.model";
import {
  Card,
  Title,
  Text,
  Metric,
  AreaChart,
  Callout,
  Divider,
  Subtitle,
  ListItem,
  List,
  Badge,
} from "@tremor/react";

const Transactions: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[] | undefined>();
  const [totalMoneyWin, setTotalMoneyWin] = useState(0);

  useEffect(() => {
    const updateTransaction: Transaction[] | undefined = transactions
      ? [...transactions]
      : [];
    let chartdata: any[] = [];
    if (user && user.referrers) {
      user.referrers.forEach((refferal) => {
        let result = 0;
        refferal.referral.transactions.forEach((trans) => {
          result += trans.amount;
          updateTransaction.push(trans);
          setTransactions(undefined);
        });
        setTransactions(updateTransaction);
        setTotalMoneyWin(result);

        chartdata.push({
          date: refferal.createdAt,
          "Utilisateur inscript avec votre code": user.referrers.filter(
            (ref) => ref.createdAt === refferal.createdAt
          ).length,
        });
      });
      setGraphData(chartdata);
    }
  }, [user]);

  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("fr").format(number).toString()}`;

  const totalRefund = () => {
    const completedTransactions = user?.transactions.filter(
      (transaction) => transaction.status === "COMPLETED"
    );
    let result = 0;
    if (completedTransactions) {
      for (const transac of completedTransactions) {
        result += transac.amount;
      }
    }
    return result;
  };

  const totalTicketBuy = () => {
    let result = 0;
    if (user?.partOfContests) {
      for (const part of user?.partOfContests) {
        result += part.contest.price;
      }
    }
    return result;
  };

  const transactionStatusIcon = (transaction: Transaction) => {
    switch (transaction.status) {
      case "COMPLETED":
        return <RiAddLine color="green" size={20} />;
      case "PENDING":
        return (
          <RiLoaderLine className="text-black/50 animate-spin" size={20} />
        );
      case "DECLINED":
        return <RiCloseLine className="text-red-jalapeno" size={20} />;
      case "FAILED":
        return <RiCloseLine className="text-red-jalapeno" size={20} />;
      case "REFUNDED":
        return <RiRefund2Line className="text-blue-500" size={20} />;
      case "PARTIALLY_REFUNDED":
        return <RiRefund2Line className="text-orange-500" size={20} />;
      default:
        return <RiAddLine color="green" size={20} />;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full grid grid-cols-4 p-4 gap-4">
        <div>
          <Card className="max-w-md h-full rounded-none">
            <Text>Nombre de parrainage</Text>
            <Metric>{user?.referrers.length}</Metric>
            <Subtitle>
              chacun de ces parrainge vous offre 10% sur chaque transaction de
              rechargement de portefeuille
            </Subtitle>
            <Divider />
            <Callout
              className="h-auto mt-4"
              title="Votre code parrain"
              icon={RiFileCopyLine}
              color="rose"
            >
              {user?.referralCode}
            </Callout>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="rounded-none">
            <Title>Utilisateur inscrit avec votre code parrainage</Title>
            <AreaChart
              className="h-72 mt-4"
              data={graphData ?? []}
              index="date"
              categories={["Utilisateur inscript avec votre code"]}
              colors={["red"]}
              valueFormatter={dataFormatter}
            />
          </Card>
        </div>
      </div>
      <div className="w-full p-4">
        <Card className="w-full rounded-none">
          <div className="flex w-full justify-between">
            <Title>{"Historique des reçus"}</Title>
            <Badge size="sm">{totalMoneyWin.toFixed(2)}€</Badge>
          </div>
          <List className="h-[200px] overflow-y-auto">
            {transactions?.map((trans) => (
              <ListItem key={trans.id}>
                <span>{trans.createdAt.split("T")[0]}</span>
                <div className="text-lg flex gap-2 items-center">
                  <RiAddLine className="text-green-400" />
                  <span>{(trans.amount * 0.1).toFixed(2)}€</span>
                  <RiArrowLeftLine />
                  <span>{trans.amount.toFixed(2)}€</span>
                </div>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
