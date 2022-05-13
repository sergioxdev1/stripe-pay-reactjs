const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();

const stripe = new Stripe(
  'sk_test_51K8VCoFGWSafDoZZV1cxQkOc4whr92IoVgNXbNGShtJGebLXko5a4Ze0QmAi51PeDGVW41ZLCdJwy9dTYL9BHFTW00HEmRLwiJ'
);

app.use(cors({ origin: 'https://react-test0001.stackblitz.io' }));

app.use(express.json());

app.post('/api/checkout', async (req, res) => {
  console.log(req.body);

  const { id, amount } = req.body;

  const payment = await stripe.paymentIntents.create({
    amount,
    currency: 'USD',
    description: 'Thing',
    payment_method: id,
    confirm: true,
  });

  console.log(payment);

  //res.send('pay received')
  res.send({ message: 'Successfull Payment' });
});

app.listen(3001, () => {
  console.log('Server on Port', 3001);
});
//try to depoy to vercel
