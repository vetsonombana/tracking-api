import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from '../../schema/dto/product.dto';
import { ProductService } from '../../services/product/product.service';

@Controller('product')
export class ProductController {

    constructor(private product: ProductService){}

    @Get()
    public async find(){ return await this.product.find() }

    @Post()
    public async create(@Body() dto: CreateProductDto){ return await this.product.create(dto) }

}
