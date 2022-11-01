import * as React from 'react';
import { useState } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";

const Donate = (props: DonateProps) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const nav = useNavigate();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement!,
            billing_details: {
                name
            }
        });

        if (error) {
            console.log('error: ', error);
        } else {
            console.log('paymentMethod ', paymentMethod);
            const res = await fetch('/api/donate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ amount, paymentMethod })
            });

            const paymentDone = await res.json();
            console.log(paymentDone);
        }
    };

    return (
        <main className="container">
            <section className="row mt-5 justify-content-center">
                <div className="col-md-6">
                    <form className="form-group p-3 border border-rounded-lg bg-light">
                        <h3 className="text-center">Thank You for your Contribution!</h3>
                        <input type="text" className="form-control my-1" value={name} onChange={e => setName(e.target.value)} />
                        <input type="text" className="form-control my-1" value={amount} onChange={e => setAmount(e.target.value)} />
                        <CardElement className="form-control my-1" />
                        <button onClick={handleSubmit} className="btn btn-primary my-1">Donate to me!</button>
                    </form>
                </div>
            </section>
        </main>
    );
};

interface DonateProps {}

export default Donate;