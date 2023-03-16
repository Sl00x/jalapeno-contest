import User from "./user.model";

interface Prize {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface Step {
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
  participants: {
    user: User;
  }[];
}
