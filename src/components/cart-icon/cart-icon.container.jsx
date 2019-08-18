import React from 'react'

import { compose, graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

import CartIconComponent from './cart-icon.component'

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }  
`;

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }  
`;

const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => (
    < CartIconComponent toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
)

export default compose(
    graphql(GET_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer)
