import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustService } from './cust.service';
import { InsertCustDTO } from './dto/insert-cust.dto';
import { UpdateCustDTO } from './dto/update-cust.dto';

@Controller('cust')
export class CustController {
  constructor(private readonly custService: CustService) {}

  @Get()
  async getAllCust() {
    return await this.custService.getAllCust();
  }

  @Post()
  insertCust(@Body() insertCustDTO: InsertCustDTO): Promise<void> {
    return this.custService.insertCust(insertCustDTO);
  }

  @Put(':id')
  updateCust(
    @Param('id') guestCode: number,
    @Body() updateCustDTO: UpdateCustDTO,
  ) {
    console.log('1');
    return this.custService.updateCust(guestCode, updateCustDTO);
  }

  @Delete(':id')
  deleteCust(@Param('id') guestCode: number) {
    return this.custService.deleteCust({ guestCode });
  }
}
