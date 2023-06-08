import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CustomerSchema } from './@core/adapters/typeorm/customer.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, 'database.sqlite'),
      synchronize: true,
      logging: false,
      entities: [CustomerSchema],
    }),
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
