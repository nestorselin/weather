import { Injectable, Logger } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { weatherMail } from '../constats/constans';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendService {
  private readonly sendGridApiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.sendGridApiKey = this.configService.get<string>('sendGridApiKey');
  }
  async sendMessage(temperature) {
    await sendgrid.setApiKey(this.sendGridApiKey);
    const massage: MailDataRequired = {
      ...weatherMail,
      text: `WOW ${temperature}`,
    };

    Logger.debug(`Message created`);

    await sendgrid.send(massage);
  }
}
