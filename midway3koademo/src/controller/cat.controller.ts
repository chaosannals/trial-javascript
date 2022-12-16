import { Controller, Get, Query } from "@midwayjs/core";

@Controller('/cat')
export class CatController {
    @Get('/find')
    async find() {
        return { success: true, message: 'OK' };
    }

    @Get('/info')
    async info(@Query('id') id: number) {
        return { success: true, message: 'OK' };
    }
}