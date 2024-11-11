import nodemailer from 'nodemailer';

// יצירת טרנספורט למשלוח מיילים
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-specific-password'
  }
});

export class EmailService {
  async sendTicketNotification(to: string, ticketData: {
    id: number;
    title: string;
    status: string;
    priority: string;
  }) {
    const mailOptions = {
      from: '"מערכת פניות" <your-email@gmail.com>',
      to,
      subject: `עדכון בפנייה #${ticketData.id}: ${ticketData.title}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif;">
          <h2>עדכון בפנייה מספר #${ticketData.id}</h2>
          <p>שלום,</p>
          <p>התקבל עדכון בפנייה שלך:</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>כותרת:</strong> ${ticketData.title}</p>
            <p><strong>סטטוס:</strong> ${ticketData.status}</p>
            <p><strong>עדיפות:</strong> ${ticketData.priority}</p>
          </div>
          <p>לצפייה בפרטים נוספים, היכנס למערכת הפניות.</p>
          <a href="http://localhost:3000/tickets/${ticketData.id}" 
             style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
            צפה בפנייה
          </a>
          <p style="margin-top: 20px; color: #666;">
            הודעה זו נשלחה באופן אוטומטי, אין להשיב למייל זה.
          </p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Failed to send email notification:', error);
      throw error;
    }
  }

  async sendDailyDigest(to: string, stats: {
    newTickets: number;
    resolvedTickets: number;
    pendingTickets: number;
  }) {
    const mailOptions = {
      from: '"מערכת פניות" <your-email@gmail.com>',
      to,
      subject: 'סיכום יומי - מערכת פניות',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif;">
          <h2>סיכום יומי - מערכת פניות</h2>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>פניות חדשות:</strong> ${stats.newTickets}</p>
            <p><strong>פניות שטופלו:</strong> ${stats.resolvedTickets}</p>
            <p><strong>פניות בהמתנה:</strong> ${stats.pendingTickets}</p>
          </div>
          <a href="http://localhost:3000/dashboard" 
             style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            כניסה למערכת
          </a>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Daily digest sent successfully');
    } catch (error) {
      console.error('Failed to send daily digest:', error);
      throw error;
    }
  }
}