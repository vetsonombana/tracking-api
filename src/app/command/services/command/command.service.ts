import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command } from '../../schema/command/command.schema';
import { CreateCommandDto, CreatePackageDto } from '../../schema/dto/command.dto';
import { faker } from '@faker-js/faker/locale/af_ZA';
import { ProductService } from '../../../product/services/product/product.service';

@Injectable()
export class CommandService {

    constructor(@InjectModel('Command') private command: Model<Command>, private product: ProductService){}

    public async findOne(id: string){
        try{ return (await this.command.findById(id)).populate({path: 'packages', populate: 'products'}) }
        catch(e){ throw new NotFoundException('Not Found')  }
    }

    public async find(){
        try{  return await this.command.find().populate({path: 'packages', populate: 'products' })  }
        catch(e){ throw new InternalServerErrorException('Internal Server Error') }
    }

    public async create(dto: CreateCommandDto){
        try{ return await (new this.command(dto)).save() }
        catch(e){ throw new InternalServerErrorException('Internal Server Error')  }
    }

    public async deliver(_id: string){
        try {
            return await this.command.updateOne({"packages._id": _id }, {
                $set: { "packages.$.state": true }
            })
        }catch(e){ throw new NotFoundException('Not Found') }
    }

    public async generate(){
        try{
            const packagesCount = faker.number.int({min: 1, max: 10})
            const packages: CreatePackageDto[] = []

            for(let i = 0; i < packagesCount; i++){
                const productCount = faker.number.int({min: 2, max: 10})
                const products: string[] = []
                for(let j = 0; j < productCount; j++){
                    const product = await this.product.generate()
                    products.push(product._id.toString())
                }
                packages.push({
                    estimation: faker.number.int({min: 3, max: 10}),
                    products: products,
                    state: false
                })
            }

            const command = new this.command({
                packages, 
                from: faker.location.streetAddress(), 
                to: faker.location.streetAddress()
            })

            return await command.save()
        }catch(e){ throw new InternalServerErrorException('Internal Server Error') }


    }

}
