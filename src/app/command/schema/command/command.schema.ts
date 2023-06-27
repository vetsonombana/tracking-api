import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from '../../../product/schema/product/product.schema';
import mongoose from 'mongoose'

@Schema()
export class Package{
    @Prop({required: true, default: false})
    public state: boolean

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}], required: true})
    public products: Product[]

    @Prop({required: true})
    estimation: number
}

export const PackageSchema = SchemaFactory.createForClass(Package)

export type CommandDocument = HydratedDocument<Command>;

@Schema({timestamps: {createdAt: 'created_at'}})
export class Command {
    @Prop({type: [PackageSchema]})
    packages: Package[]

    @Prop({required: true})
    from: string

    @Prop({required: true})
    to: string
}

export const CommandSchema = SchemaFactory.createForClass(Command);