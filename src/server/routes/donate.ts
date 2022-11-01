import * as express from 'express';
import Stripe from 'stripe';
import config from '../config';

const stripe = new Stripe(config.stripe.secret, { apiVersion: '2022-08-01'});

const donateRouter = express.Router();

donateRouter.post('/', async (req, res, next) => {
    const paymentMethod = req.body.paymentMethod;
    const amount = req.body.amount;
    try {
        const fulfilled = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: Number(amount) * 100,
            payment_method: paymentMethod.id,
            confirm: true
        });
        res.json(fulfilled);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'servor error, check the logs' })
    }
});

export default donateRouter;