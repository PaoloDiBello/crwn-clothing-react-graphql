import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CheckoutPage from './checkout.component';

const GET_CART_TOTAL_AMOUNT = gql`
  {
    cartTotalAmount @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const CheckoutPageContainer = () => (
    <Query query={GET_CART_ITEMS}>
        {({ data: { cartItems } }) => (
            <Query query={GET_CART_TOTAL_AMOUNT}>
                {({ data: { cartTotalAmount } }) => {
                    return (<CheckoutPage total={cartTotalAmount} cartItems={cartItems} />)
                }}
            </Query>
        )}
    </Query>
);

export default CheckoutPageContainer;