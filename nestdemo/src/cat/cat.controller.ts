import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { CatService } from "./cat.service";
import { Cat } from './cat.interface';

export class CatCreatedParam {
    name: string;
    age: number;
    birthday: Date | undefined;
    tags: Array<string>;
}

@Controller("cat")
export class CatController {
    constructor(private catService: CatService) {}

    @Get('find')
    async find(): Promise<Cat[]> {
        return this.catService.findAll();
    }

    @Get(':id')
    async info(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res: Response): Promise<any> {
        if (id <= 0) {
            res.status(HttpStatus.BAD_REQUEST);
            return {
                tip: '无效ID'
            };
        }
        return {
            id: id,
        };
    }

    @Post('create')
    async create(@Body() cat: CatCreatedParam): Promise<Cat> {
        console.log('cat create', cat);
        const c = await this.catService.create(cat);
        return c;
    }

    // @Post('edit')
    // async edit(@Body() )
}