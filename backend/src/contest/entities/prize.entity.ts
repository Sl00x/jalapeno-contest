import { Step } from 'src/contest/entities/step.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Prize extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @OneToOne(() => Step, (step) => step.prize)
  step: Step;
}
