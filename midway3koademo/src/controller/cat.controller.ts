import { Controller, Get, Query } from "@midwayjs/core";

@Controller('/cat')
export class CatController {
    @Get('/find')
    async find() {

    }

    @Get('/info')
    async info(@Query('id') id: number) {
        
    }
}