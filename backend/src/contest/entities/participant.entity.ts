import { Contest } from 'src/contest/entities/contest.entity';
import { User } from 'src/user/entities/user.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Participant extends DefaultEntity {
  @Column({ type: 'int', default: 1 })
  tickets: number;

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.participations)
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ nullable: true })
  contestId?: string;

  @ManyToOne(() => Contest, (contest) => contest.participants)
  @JoinColumn({ name: 'contestId' })
  contest?: User;
}
