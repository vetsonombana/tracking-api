import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({required: true, unique: true})
    key: string

    @Prop({required: true})
    name: string 
    
    @Prop({required: true})
    mass: number

    @Prop({required: true})
    image: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);