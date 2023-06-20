import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {SendMailDto} from "./dto/send-mail.dto";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(data : SendMailDto){
        await this.mailerService.sendMail(data)
    }
}
