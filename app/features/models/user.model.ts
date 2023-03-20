import PartOfContest from "./partOfContest.model";
import Transaction from "./transaction.model";

export default interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  balance: number;
  referralCode: string;
  referrer: User;
  referrals: User[];
  partOfContests: PartOfContest[];
  transactions: Transaction[];
  createdAt: string;
  deletedAt?: string;
}
