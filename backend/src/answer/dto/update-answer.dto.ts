import { ApiProperty } from "@nestjs/swagger";

export class UpdateAnswerDto {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    answer: string;

    @ApiProperty()
    isCorrect: number;
}