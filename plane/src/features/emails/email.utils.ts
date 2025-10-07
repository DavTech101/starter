//##########################################################################################
// MAILER CONFIG FACTORY
//##########################################################################################
export const createMailerConfig = (
  service: string,
  user: string,
  pass: string
) => ({
  host: '',
  port: 0,
  service,
  user,
  pass,
});
