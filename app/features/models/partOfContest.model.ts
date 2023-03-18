import Contest from "./contest.model";
import User from "./user.model";

export default interface PartOfContest {
  id: number;
  contest: Contest;
  userId?: number;
  user?: User;
  createdAt?: string;
}
