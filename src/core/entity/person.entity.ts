import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Entity({ schema: 'public', name: 'person' })
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  created_at: Date;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.id)
  projects: TransactionEntity[];
}
