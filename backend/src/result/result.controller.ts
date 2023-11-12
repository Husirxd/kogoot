import { Controller, Get, Query } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {

    constructor(
        private readonly resultService: ResultService
        ) {
        
    }

    @Get()
        async getResult(@Query('userId') userId: number, @Query('result') result: string): Promise<any> {

        return this.resultService.getResult(result, userId);
    }
}
