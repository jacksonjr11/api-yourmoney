import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity({ schema: 'public', name: 'transaction' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  cust: number;

  @Column()
  payment_date: string;

  @Column()
  created_at: string;

  @ManyToOne(() => PersonEntity, (person) => person.id)
  student: PersonEntity;
}
