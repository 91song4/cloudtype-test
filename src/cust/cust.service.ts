import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Cust } from './cust.entity';
import { CustDetail } from './cust-detail.entity';
import { InsertCustDTO } from './dto/insert-cust.dto';
import { UpdateCustDTO } from './dto/update-cust.dto';
import axios from 'axios';

@Injectable()
export class CustService {
  constructor(
    @InjectRepository(Cust) private readonly custRepository: Repository<Cust>,
    @InjectRepository(CustDetail)
    private readonly custDetailRepository: Repository<CustDetail>,
    private dataSource: DataSource,
  ) {}

  // cust, cust_detail 정보 모두 가져오기
  async getAllCust() {
    const custs = await this.custDetailRepository.find({
      select: ['guestHp', 'guestAddr', 'guestMail'],
      relations: ['cust'],
    });

    return custs.map((cust) => {
      return {
        ...cust.cust,
        guestHp: cust.guestHp,
        guestAddr: cust.guestAddr,
        guestMail: cust.guestMail,
      };
    });
  }

  async insertCust({ path }: InsertCustDTO): Promise<void> {
    try {
      // 데이터 받아오기
      const { data: response } = await axios.get(path);

      // cust table 에 들어갈 데이터 집합
      const custs = response.data[0].cust.map((cust) => {
        return {
          guestCode: cust.guest_code,
          guestName: cust.guest_name,
          guestBirth: cust.guest_birth,
        };
      });

      // cust_detail table 에 들어갈 데이터 집합
      const custDetails = response.data[0].cust_detail.map((custDetail) => {
        return {
          guestCode: custDetail.guest_code,
          guestHp: custDetail.guest_hp,
          guestAddr: custDetail.guest_addr,
          guestMail: custDetail.guest_mail,
        };
      });

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // 기존 데이터 삭제
        await this.deleteCust();

        await this.custRepository
          .createQueryBuilder()
          .insert()
          .values(custs)
          .execute();

        await this.custDetailRepository
          .createQueryBuilder()
          .insert()
          .values(custDetails)
          .execute();

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    } catch (err) {
      throw err;
    }
  }

  async updateCust(guestCode: number, updateCustDTO: UpdateCustDTO) {
    console.log('2');
    // cust table 에 들어갈 데이터 집합
    const cust = {
      guestName: updateCustDTO.guestName,
      guestBirth: updateCustDTO.guestBirth.toString(),
    };

    // cust_detail table 에 들어갈 데이터 집합
    const custDetail = {
      guestHp: updateCustDTO.guestHp,
      guestAddr: updateCustDTO.guestAddr,
      guestMail: updateCustDTO.guestMail,
    };

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    console.log('3');
    try {
      await this.custRepository.update(guestCode, { ...cust });
      console.log('4');

      await this.custDetailRepository.update(guestCode, {
        ...custDetail,
      });
      console.log('5');

      await queryRunner.commitTransaction();
      console.log('6');
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  //데이터 삭제
  async deleteCust(userId?): Promise<void> {
    // userId에 데이터가 있으면 userId 삭제 없으면 모두 삭제
    await this.custRepository.delete({ ...userId });
  }
}
