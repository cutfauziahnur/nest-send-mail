import {Process, Processor} from "@nestjs/bull";
import {Job} from "bull"
import {MailService} from "./mail.service";
import {SendMailDto} from "./dto/send-mail.dto";

@Processor('send-mail-queue')
export class SendMailConsumer{

    constructor(private readonly mailService: MailService) {}

    @Process('send-mail-job')
    async sendMailJob(job : Job<SendMailDto>){
        await this.mailService.sendMail(job.data)
    }
}