import { Injectable } from '@nestjs/common';
import {InjectQueue} from "@nestjs/bull";
import { Queue } from "bull"
import {SendMailDto} from "./dto/send-mail.dto";

@Injectable()
export class SendMailProducer {
    constructor(@InjectQueue('send-mail-queue') private readonly sendMailQueue : Queue) {
    }

    async sendMail(data : SendMailDto){
        await this.sendMailQueue.add('send-mail-job', data, {delay : 5000})
    }
}
