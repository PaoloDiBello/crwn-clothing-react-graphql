import { gql } from 'apollo-boost'


import { addItemToCart } from './cart.utils'

export const typeDefs = gql`

extend type Item {
    quantity: Int
}

extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item] 
} 
`
// cart hidden -> client directive @
// local not in the back end
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
  `;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN,
            });
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            })

            return !cartHidden
        },
        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({ // destructure bc of cartItems @client 
                query: GET_CART_ITEMS
            })

            const newCartItems = addItemToCart(cartItems, item);
            cache.writeQuery({
                query: addItemToCart,
                data: { cartItems: newCartItems }
            })

            return cartItems;
        }
    }
} 