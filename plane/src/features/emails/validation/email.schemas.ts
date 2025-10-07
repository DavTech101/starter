//##########################################################################################
// MAILER TYPES
//##########################################################################################
export type TMailerConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  service?: string;
};

export type TMailOptions = {
  to: string;
  html: string;
  subject: string;
};

export type TMailAttachment = {
  content: Buffer;
  filename: string;
  contentType: string;
};

export type TMailFeedback = {
  message: string;
  status: 'success' | 'error';
};

//##########################################################################################
// EMAIL CONSTANTS
//##########################################################################################
export type TEmailData = {
  body: string;
  sender: string;
  subject: string;
  receiver: string;
  mailerConfig: TMailerConfig;
  attachments?: TMailAttachment[];
};

//##########################################################################################
// EMAIL FOOTER TYPES
//##########################################################################################
export type TPoweredBy = {
  name: string;
  title: string;
  link: string;
};
