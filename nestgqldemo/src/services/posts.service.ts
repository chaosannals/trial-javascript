import { Injectable } from "@nestjs/common";
import { Post } from "src/models/post.model";
import { Author } from "../models/author.model";

@Injectable()
export class PostsService {

    constructor() {}

    async findAll(aid: number): Promise<Post[]> {
        return [];
    }
}