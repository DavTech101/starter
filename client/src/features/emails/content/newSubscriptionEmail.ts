export const newSubscriptionEmail = (email: string, name: string) => {
  const subject = 'Welcome';
  const html = `
        <p>Hi ${name},</p>
        <br/>
        <p>Stay tuned for updates and new features.</p>
        <br/>
        <p>Thank you for choosing us.</p>
        <br/>
        <p>Best,</p>
        <b>Www</b>
    `;

  return { email, subject, html };
};
