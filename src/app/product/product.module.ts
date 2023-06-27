import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product/product.schema';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controllers/product/product.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
