import nodemailer, { Transporter } from 'nodemailer';
import { TMailerConfig } from './validation/email.schemas';
import { TMailFeedback, TMailAttachment } from './validation/email.schemas';

//##########################################################################################
// MAILER CLASS
//##########################################################################################
export class Mailer {
  private html?: string;
  private sender?: string;
  private subject?: string;
  private receiver?: string;
  private transporter: Transporter;
  private attachments?: TMailAttachment[];

  constructor(mailerConfig: TMailerConfig) {
    this.transporter = nodemailer.createTransport({
      host: mailerConfig.host,
      port: mailerConfig.port,
      service: mailerConfig.service,
      auth: {
        user: mailerConfig.user,
        pass: mailerConfig.pass,
      },
    });
  }

  public setSender(sender: string) {
    this.sender = sender;
  }

  public setReceiver(receiver: string) {
    this.receiver = receiver;
  }

  public setSubject(subject: string) {
    this.subject = subject;
  }

  public setEmailBody(body: string) {
    this.html = body;
  }

  public setAttachments(attachments: TMailAttachment[]) {
    this.attachments = attachments;
  }

  private getMissingMailOptions(): string[] {
    const missing: string[] = [];

    if (this.html === undefined) missing.push('html');
    if (this.sender === undefined) missing.push('sender');
    if (this.subject === undefined) missing.push('subject');
    if (this.receiver === undefined) missing.push('receiver');

    return missing;
  }

  private checkEmailValidity(): TMailFeedback | undefined {
    const missingOptions = this.getMissingMailOptions();

    if (missingOptions.length > 0) {
      return this.handleError({
        code: 'MISSING_EMAIL_OPTIONS',
        message: `Not all email options are set. Missing: ${missingOptions.join(
          ', '
        )}`,
      });
    }
    return undefined;
  }

  public async sendMail(): Promise<TMailFeedback> {
    const check = this.checkEmailValidity();
    if (check) return check;

    try {
      const info = await this.transporter.sendMail({
        html: this.html,
        from: this.sender,
        to: this.receiver,
        subject: this.subject,
        attachments: this.attachments,
      });

      return {
        status: 'success',
        message: info.messageId,
      };
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): TMailFeedback {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const code = (error as { code?: string }).code;
      const message = (error as { message?: string }).message;

      switch (code) {
        case 'ECONNECTION':
          return {
            status: 'error',
            message: 'Failed to connect to the email server',
          };
        case 'EAUTH':
          return {
            status: 'error',
            message: 'Failed to authenticate with the email server',
          };
        case 'EENVELOPE':
          return {
            status: 'error',
            message: 'Invalid email recipient address',
          };
        case 'MISSING_EMAIL_OPTIONS':
          return {
            status: 'error',
            message: message || 'Not all email options are set.',
          };
        default:
          return {
            status: 'error',
            message: `Failed to send email: ${message}`,
          };
      }
    }

    return {
      status: 'error',
      message: 'Failed to send email: Unknown error',
    };
  }
}

export default Mailer;
