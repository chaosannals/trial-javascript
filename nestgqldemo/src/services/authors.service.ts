import { Injectable } from "@nestjs/common";
import { Author } from "../models/author.model";

@Injectable()
export class AuthorsService {

    constructor() {}

    async findOneById(id: number): Promise<Author> {
        return new Author();
    }
}