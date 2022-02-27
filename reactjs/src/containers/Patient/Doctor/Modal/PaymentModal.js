import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from "axios";

const KEY =
  "pk_test_51KWhxkBlP7ST50jPBalGIiOl5L4Y6oNKccmxTKtQQV7dJnWLDahY5R5Ixdv9YXZ8xZ04zTZKT9oEfdNPnFKJX3ym00MInhWmi6";

const Pay = (props) => {
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
    console.log(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <StripeCheckout
      name="Booking Care"
      image="https://avatars.githubusercontent.com/u/1486366?v=4"
      billingAddress
      shippingAddress
      description=" Your total is $20"
      amount={2000}
      token={onToken}
      stripeKey={KEY}
      closed={props.onClose}
    >
      {props.children}
    </StripeCheckout>
  );
};
export default Pay;
