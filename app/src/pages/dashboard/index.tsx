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
import { SuccessToast } from "../../../utils/toast";

const Transactions: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[] | undefined>();
  const [totalMoneyWin, setTotalMoneyWin] = useState(0);

  useEffect(() => {
    const updateTransaction: Transaction[] = [];
    let chartdata: any[] = [];
    if (user && user.referrers) {
      let result = 0;
      user.referrers.forEach((refferal) => {
        refferal.referral.transactions.forEach((trans) => {
          result += trans.amount * 0.1;
          updateTransaction.push(trans);
        });
        setTransactions(updateTransaction);
        setTotalMoneyWin(result);

        chartdata.push({
          date: refferal.createdAt,
          "Utilisateurs inscrits avec mon code": user.referrers.filter(
            (ref) => ref.createdAt === refferal.createdAt
          ).length,
        });
      });
      setGraphData(chartdata);
    }
  }, [user]);

  const dataFormatter = (number: number) => `${Intl.NumberFormat("fr").format(number).toString()}`;

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
        return <RiLoaderLine className="text-black/50 animate-spin" size={20} />;
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
      <div className="grid grid-cols-3 gap-2 p-4">
        <Card className="w-full mx-auto rounded-none" decoration="top" decorationColor="green">
          <Text>Argent ajouté</Text>
          <Metric>{totalRefund().toFixed(2)} €</Metric>
        </Card>
        <Card className="w-full mx-auto  rounded-none" decoration="top" decorationColor="red">
          <Text>Total dépensé</Text>
          <Metric>{totalTicketBuy().toFixed(2)} €</Metric>
        </Card>
        <Card className="w-full mx-auto  rounded-none" decoration="top" decorationColor="blue">
          <Text>Solde actuel</Text>
          <Metric>{user?.balance.toFixed(2)} €</Metric>
        </Card>
      </div>
      <div className="w-full grid grid-cols-4 p-4 gap-4">
        <div>
          <Card className="max-w-md h-full rounded-none">
            <Text>Nombre de parrainages</Text>
            <Metric>{user?.referrers.length}</Metric>
            <Subtitle>
              chacun de ces parrainages vous offre 10% sur chaque transaction d'ajout de fonds par
              le filleul
            </Subtitle>
            <Divider />
            <Callout
              onClick={() => {
                navigator.clipboard.writeText(user?.referralCode ?? "");
                SuccessToast("Code parrainage copié");
              }}
              className="h-auto mt-4 cursor-pointer"
              title="Mon code parrainage"
              icon={RiFileCopyLine}
              color="yellow"
            >
              {user?.referralCode}
            </Callout>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="rounded-none">
            <Title>Utilisateurs inscrits avec mon code parrainage</Title>
            <AreaChart
              className="h-72 mt-4"
              data={graphData ?? []}
              index="date"
              categories={["Utilisateurs inscrits avec mon code"]}
              colors={["red"]}
              valueFormatter={dataFormatter}
            />
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="w-full p-4">
          <Card className="w-full rounded-none">
            <div className="flex w-full justify-between">
              <Title>{"Historique des reçus par parrainage"}</Title>
              <Badge size="sm">{totalMoneyWin.toFixed(2)}€</Badge>
            </div>
            <List className="h-[200px] overflow-y-auto">
              {transactions && transactions.length > 0 ? (
                transactions.map((trans) => (
                  <ListItem key={trans.id}>
                    <span>{trans.createdAt.split("T")[0]}</span>
                    <div className="text-lg flex gap-2 items-center">
                      <RiAddLine className="text-green-400" />
                      <span>{(trans.amount * 0.1).toFixed(2)}€</span>
                      <RiArrowLeftLine />
                      <span>{trans.amount.toFixed(2)}€</span>
                    </div>
                  </ListItem>
                ))
              ) : (
                <div className="mt-2">Aucune transaction pour le moment</div>
              )}
            </List>
          </Card>
        </div>
        <div className="w-full p-4">
          <Card className="w-full rounded-none">
            <div className="flex w-full justify-between">
              <Title>{"Historique transactions"}</Title>
              <Badge size="sm">{totalRefund().toFixed(2)}€</Badge>
            </div>
            <List className="h-[200px] overflow-y-auto">
              {user?.transactions && user.transactions.length > 0 ? (
                user.transactions.map((trans) => (
                  <ListItem key={trans.id}>
                    <span>{trans.createdAt.split("T")[0]}</span>
                    <div className="text-lg flex gap-2 items-center">
                      {transactionStatusIcon(trans)}
                      <span>{trans.amount.toFixed(2)}€</span>
                    </div>
                  </ListItem>
                ))
              ) : (
                <div className="mt-2">Aucune transaction pour le moment</div>
              )}
            </List>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
