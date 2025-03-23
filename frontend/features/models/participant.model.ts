import Contest from "./contest.model";
import User from "./user.model";

export default interface Participant {
  id: number;
  contestId: Contest;
  contest: Contest;
  userId: number;
  user: User;
}
