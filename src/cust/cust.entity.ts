import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'secuprime', name: 'cust' })
export class Cust {
  @PrimaryColumn({ type: 'int', unsigned: true, name: 'guest_code' })
  guestCode: number;

  @Column({ type: 'char', length: 10, nullable: false, name: 'guest_name' })
  guestName: string;

  @Column({ type: 'date', nullable: false, name: 'guest_birth' })
  guestBirth: string;
}
