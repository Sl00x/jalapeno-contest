import { Participant } from 'src/contest/entities/participant.entity';
import { Step } from 'src/contest/entities/step.entity';
import { User } from 'src/user/entities/user.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export enum ContestState {
  WAITING = 'WAITING',
  SHIPPING = 'SHIPPING',
  RECEIVED = 'RECEIVED',
  VALIDATED = 'VALIDATED',
}

@Entity()
export class Contest extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  startedAt: Date;

  @Column({ type: 'timestamp' })
  endedAt: Date;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'enum', enum: ContestState, default: ContestState.WAITING })
  state: ContestState;

  @Column({ nullable: true })
  ownerId?: string;

  @ManyToOne(() => User, (user) => user.contests)
  @JoinColumn({ name: 'ownerId' })
  owner?: User;

  @Column({ nullable: true })
  winnerId?: string;

  @ManyToOne(() => User, (user) => user.wonContests)
  @JoinColumn({ name: 'winnerId' })
  winner?: User;

  @OneToMany(() => Step, (step) => step.contest)
  steps: Step[];

  @OneToMany(() => Participant, (participant) => participant.contest)
  participants: Participant[];
}
