import PartOfContest from "./partOfContest.model";
import Transaction from "./transaction.model";
import User from "./user.model";

export default interface Referrer {
  id: number;
  referralId: number;
  referrerId: number;
  createdAt: string;
  referrer: User;
  referral: User;
}
