import { Body, Controller, Post } from '@nestjs/common';

import { MessagesService } from '../../src/messages/messages.service';

import { Actions_Enum } from '../../../constants';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // @Post('chat')
  // async parseData(
  //   @Body()
  //   data: {
  //     sender_id?: string;
  //     sender_name?: string;
  //     msg?: string;
  //     action: string;
  //     count?: number;
  //   },
  // ) {
  //   if (data.action === Actions_Enum.ADD_MESSAGE) {
  //     return await this.messagesService.addMessage(data).then((result) => {
  //       return result;
  //     });
  //   }

  //   if (data.action === Actions_Enum.ALL_MESSAGES) {
  //     return await this.messagesService.findAll().then((result) => {
  //       return result;
  //     });
  //   }

  //   if (data.action === Actions_Enum.INITIALIZE_MESSAGES) {
  //     return await this.messagesService.initializeMessages().then((result) => {
  //       return result;
  //     });
  //   }

  //   if (data.action === Actions_Enum.FETCH_MORE) {
  //     if (data.count) {
  //       return await this.messagesService
  //         .fetchMoreMessages(data.count)
  //         .then((result) => {
  //           return result;
  //         });
  //     }
  //   }
  // }
}
