import { Module } from '@nestjs/common';
import { CommandService } from './services/command/command.service';
import { CommandController } from './controllers/command/command.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandSchema } from './schema/command/command.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Command', schema: CommandSchema}]),
    ProductModule
  ],
  providers: [CommandService],
  controllers: [CommandController]
})
export class CommandModule {}
