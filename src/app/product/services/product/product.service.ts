import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schema/product/product.schema';
import { CreateProductDto } from '../../schema/dto/product.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private product: Model<Product>){}

    public async find(){
        try{ return await this.product.find() }
        catch(e){ throw new InternalServerErrorException('Internal Server Error') }
    }

    public async create(prod: CreateProductDto){
        try{
            const p = new this.product(prod)
            return await p.save()
        }catch(e){ throw new InternalServerErrorException('Internal Server Error') }
    }

    public async generate(){
        try{
            const product = new this.product({
                image: faker.image.url({width: 500, height: 500}),
                name: faker.commerce.productName(),
                mass: faker.number.float({min: 200, max: 1000, precision: 2}),
                key: faker.database.mongodbObjectId()
            }) 
            return await product.save()
        }catch(e){ throw new InternalServerErrorException('Internal Server Error') }
    }

}
