import { Contest } from 'src/contest/entities/contest.entity';
import { Participant } from 'src/contest/entities/participant.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends DefaultEntity {
  //Supabase uuid
  @Column({ type: 'uuid', primary: true })
  id: string;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  referralCode: string;

  @Column({ nullable: true })
  referrerId?: string;

  @ManyToOne(() => User, (user) => user.referrals)
  @JoinColumn({ name: 'reffererId' })
  referrer?: User;

  @OneToMany(() => User, (user) => user.referrer)
  referrals: User[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Participant, (participant) => participant.user)
  participations: Participant[];

  @OneToMany(() => Contest, (contest) => contest.owner)
  contests: Contest[];

  @OneToMany(() => Contest, (contest) => contest.winner)
  wonContests: Contest[];
}
