import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api/chatbot')
  getReply(@Body() body: { prompt: string }): Promise<string> {
    return this.appService.getReply(body.prompt);
  }
}
