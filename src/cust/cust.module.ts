import { Module } from '@nestjs/common';
import { CustController } from './cust.controller';
import { CustService } from './cust.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cust } from './cust.entity';
import { CustDetail } from './cust-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cust, CustDetail])],
  controllers: [CustController],
  providers: [CustService],
})
export class CustModule {}
