import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PropertyService } from './property.service';
import { ChototProperty } from './entites/property.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

describe('PropertyService', () => {
  let service: PropertyService;
  let repository: Repository<ChototProperty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: getRepositoryToken(ChototProperty),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
    repository = module.get<Repository<ChototProperty>>(getRepositoryToken(ChototProperty));
  });

  describe('findAll', () => {
    it('should return an array of properties and count', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10 };
      const properties = [new ChototProperty(), new ChototProperty()];
      const count = 2;

      jest.spyOn(repository, 'findAndCount').mockResolvedValue([properties, count]);

      const result = await service.findAll(paginationDto);
      expect(result).toEqual({ data: properties, count });
    });
  });

  describe('findOne', () => {
    it('should return a property if found', async () => {
      const id = '1';
      const property = new ChototProperty();
      jest.spyOn(repository, 'findOne').mockResolvedValue(property);

      const result = await service.findOne(id);
      expect(result).toEqual(property);
    });

    it('should throw NotFoundException if property not found', async () => {
      const id = '1';
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });
});