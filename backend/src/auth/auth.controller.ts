import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'Returns users request object'})
  @Get('validate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  validate(@Request() req) {
    return req.user;
  }

  @ApiResponse({ status: 200, description: 'Returns access token as access_token'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }



}