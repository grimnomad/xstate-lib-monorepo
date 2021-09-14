import { Body, Controller, Get, Post } from '@nestjs/common';
import { createTestMachine, User } from 'lib';
import { interpret } from 'xstate';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() body: User): void {
    const service = interpret(createTestMachine(body));

    service.onTransition((state) => {
      console.log(state.value);
      console.log(state.context);
    })

    service.onDone(() => service.stop());

    service.start();
  }
}
