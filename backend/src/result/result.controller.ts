import { Controller, Get, Query, Param } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {

    constructor(
        private readonly resultService: ResultService
        ) {
        
    }

    @Get(':uid')
        async getResults(@Param('uid') uid: string): Promise<any> {
        return this.resultService.getResult(uid);
    }

    @Get()
        async getResult(@Query('userId') userId: number, @Query('result') result: string): Promise<any> {
        return this.resultService.getResults(result, userId);
    }


}

