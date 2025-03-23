import { Contest } from 'src/contest/entities/contest.entity';
import { Prize } from 'src/contest/entities/prize.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Step extends DefaultEntity {
  @Column({ type: 'int' })
  treshold: number;

  @Column()
  contestId: string;

  @ManyToOne(() => Contest, (contest) => contest.steps)
  @JoinColumn({ name: 'contestId' })
  contest: Contest;

  @Column()
  prizeId: string;

  @OneToOne(() => Prize, (prize) => prize.step)
  @JoinColumn({ name: 'prizeId' })
  prize: Prize;
}
