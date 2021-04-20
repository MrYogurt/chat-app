import { MessagesService } from './messages.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Actions_Enum } from '../../../constants';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('kavo')
  kavo() {
    console.log('tavo');
  }

  @Post('chat')
  async parseData(
    @Body()
    data: {
      sender_id: string;
      sender_name: string;
      msg: string;
      action: string;
    },
  ) {
    console.log('data:', data);
    if (data.action === Actions_Enum.ADD_MESSAGE) {
      console.log('run querry');
      return await this.messagesService.addMessage(data);
    }

    if (data.action === Actions_Enum.ALL_MESSAGES) {
      return await this.messagesService.findAll();
    }
  }
}
