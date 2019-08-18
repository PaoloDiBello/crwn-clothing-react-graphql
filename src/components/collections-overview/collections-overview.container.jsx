import React from 'react'

import { Query } from 'react-apollo'

import { gql } from 'apollo-boost'

import CollectionsOverview from './collections-overview.component'
import Spinner from '../spinner/spinner.component'

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionOverContainer = () => {
    return (
        <Query query={GET_COLLECTIONS}>
            {
                ({ loading, error, data }) => {
                    console.log('loading', loading)
                    console.error('error', error)
                    console.log('data', data)
                    if (loading) {
                        return <Spinner />
                    } else {
                        return <CollectionsOverview collections={data.collections} />
                    }
                }
            }
        </Query>
    )
}

export default CollectionOverContainer


