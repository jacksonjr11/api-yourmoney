import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'transaction' })
export class PersonEntity {
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
}
