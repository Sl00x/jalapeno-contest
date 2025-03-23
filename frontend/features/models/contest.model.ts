import Participant from "@/features/models/participant.model";
import User from "./user.model";

export enum ContestState {
  WAITING = "WAITING",
  SHIPPING = "SHIPPING",
  RECEIVED = "RECEIVED",
  VALIDATED = "VALIDATED",
}

export interface Prize {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface Step {
  id: number;
  prize: Prize;
  threshold: number;
}

export default interface Contest {
  id: number;
  name: string;
  description: string;
  startAt: string;
  endAt: string;
  price: number;
  winner: User | null;
  steps: Step[];
  state: ContestState;
  participants: Participant[];
}
