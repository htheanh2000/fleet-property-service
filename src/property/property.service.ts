import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { ChototProperty } from './entites/property.entity';

@Injectable()
export class PropertyService {

    constructor (
        @InjectRepository(ChototProperty)
        private propertyRepository : Repository<ChototProperty> 
    ) {}

    async findAll(paginationDto: PaginationDto): Promise<{data: ChototProperty[], count : number}> {
        const { page = 1, limit = 10 } = paginationDto;
        const [data, count] = await this.propertyRepository.findAndCount({
            skip: (page-1) * limit,
            take: limit
        })
        return {data, count}
    }

    async findOne(id: string): Promise<ChototProperty> {
        const property = await this.propertyRepository.findOne({where: {id}});
        if (!property) {
            throw new NotFoundException('Property not found');
        }
        return property;
    }
    
}
