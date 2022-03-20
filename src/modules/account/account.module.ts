import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from 'src/core/entity/person.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonEntity], 'yourmoney'),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
