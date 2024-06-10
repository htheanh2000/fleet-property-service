import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [PropertyModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1',
    database: 'fleet',
    entities: [],
    autoLoadEntities: true,
    synchronize: true, // Add this line to synchronize the schema with the database
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
