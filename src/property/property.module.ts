import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChototProperty } from './entites/property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChototProperty])],
  controllers: [PropertyController],
  providers: [PropertyService]
})
export class PropertyModule {}
