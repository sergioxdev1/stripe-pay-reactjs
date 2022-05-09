import React from "react";

import {loadStripe} from "@stripe/stripe-js" //Import module from STRIPE
import {CardElement, Elements, useStripe, useElements} from "@stripe/react-stripe-js" //Import elements  from STRIPE

import axios from "axios"; //to send payment to backend API nodejs

import "bootstrap/dist/css/bootstrap.min.css"; //just style

const stripePromise = loadStripe("pk_test_51K8VCoFGWSafDoZZj4iWBrAT0aQGX2gyaRNyI6d0Qkxv6xUUFMaZLtTU0isbuNdanF3tzo0LrCHYUTeJ5fv5lKfV00FOiBLaAK");
//Public KEY from STRIPE Account for make payment in the frontend

const CheckoutForm = () => {

const stripe = useStripe();
const elements = useElements();

const handleSumbit = async (e) => { // Function for make Payment in Frontend with the BUTTON rendered
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({ //Creating Payment in the frontend
      type: "card",
      card: elements.getElement(CardElement)
    });

    if(!error){

        console.log(paymentMethod);

        const { id } = paymentMethod; //Send payment to Backend
        try {
        const { data } = await axios.post('http://localhost:3001/api/checkout', { // API webservice URL
          id,
          amount: 10000,
        }
        );
        console.log(data);

        elements.getElement(CardElement).clear(); //Clean form after of Payment

    }catch(error){
      console.log(error);
    }
  }
};

// Rendering screen with the product to buy
  return <form onSubmit={handleSumbit} className="card card-body bg-info">

    <img src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-4/256/Add-item-icon.png" className="img-fluid" />
    <h3 className="text-center">$100 USD</h3>
    
    <div className="form-group m-4">
    <CardElement className="form-control" />
    </div>

    <button className="btn btn-dark">
      BUY
    </button>

  </form>
}

function App() {
  return (
  <Elements stripe={stripePromise}>
    <div className='container p-4'>
      <div className='row'>
          <div className='col-md-4 offset-md-4'>
          <CheckoutForm/>
          </div>
      </div>
    </div>
  </Elements>
  );
}

export default App;
