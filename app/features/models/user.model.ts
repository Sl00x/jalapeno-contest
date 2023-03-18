import PartOfContest from "./partOfContest.model";
import Referrer from "./referrer.model";
import Transaction from "./transaction.model";

export default interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  balance: number;
  referralCode: string;
  referrers: Referrer[];
  referrals: Referrer[];
  partOfContests: PartOfContest[];
  transactions: Transaction[];
}
