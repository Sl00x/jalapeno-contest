export default interface Transaction {
  id?: number;
  orderId: string;
  status: string;
  amount: number;
  createdAt: string;
  deletedAt: string | null;
  userId?: number;
}
