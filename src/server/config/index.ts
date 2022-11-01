import * as dotenv from 'dotenv';

dotenv.config();

export default {
    stripe: {
        secret: process.env.STRIPE_API_KEY
    },
    mailgun: {
        apiKey: process.env.MAILGUN_API_Key,
        domain: process.env.MAILGUN_DOMAIN,
        toEmail: process.env.MAILGUN_TO_EMAIL
    }
}