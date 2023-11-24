import { ApiProperty } from "@nestjs/swagger";
import { Multer } from "multer";

export class CreateUserDto {
    @ApiProperty()    
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    nickname?: string;
    @ApiProperty()
    uid: string;
    
}