import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cat.schema';

@Injectable()
export class CatService {

    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

    async create(cat: Cat): Promise<Cat> {
        const c = new this.catModel(cat);
        return await c.save();
    }

    async findAll(): Promise<Cat[]> {
        return await this.catModel.find().exec();
    }
}