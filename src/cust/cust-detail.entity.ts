import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Cust } from './cust.entity';

@Entity({ schema: 'secuprime', name: 'cust_detail' })
export class CustDetail {
  @PrimaryColumn({ type: 'int', unsigned: true, name: 'guest_code' })
  guestCode: number;

  @Index({ unique: true })
  @Column({
    type: 'char',
    length: 12,
    nullable: false,
    name: 'guest_hp',
  })
  guestHp: string;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'guest_addr' })
  guestAddr: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30, nullable: false, name: 'guest_mail' })
  guestMail: string;

  @OneToOne(() => Cust, (cust) => cust.guestCode, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'guest_code', referencedColumnName: 'guestCode' })
  cust: Cust;
}
