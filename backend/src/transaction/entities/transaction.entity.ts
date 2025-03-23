import { User } from 'src/user/entities/user.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction extends DefaultEntity {
  @Column()
  orderId: string;

  @Column()
  status: string;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;
}
