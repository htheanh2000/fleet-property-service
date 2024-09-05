import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
// import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ChototProperty } from './entites/property.entity';
import { PropertyService } from './property.service';
import { PaginationDto } from '../common/dtos/pagination.dto';


@Controller('property')
export class PropertyController {
    constructor(
        private propertyService : PropertyService
    ) { }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        const { data, count } = await this.propertyService.findAll(paginationDto);
        return {
          data,
          total: count,
          page: paginationDto.page || 1,
          limit: paginationDto.limit || 10,
        };
    
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        const property = await this.propertyService.findOne(id);
        if (!property) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Property not found',
            };
        }
        return property;
    }
}
