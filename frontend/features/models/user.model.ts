import Participant from "./participant.model";
import Transaction from "./transaction.model";

export default interface User {
  id: number;
  email: string;
  referralCode: string;
  referrer: User;
  referrals: User[];
  participations: Participant[];
  transactions: Transaction[];
  createdAt: string;
  deletedAt?: string;
}
