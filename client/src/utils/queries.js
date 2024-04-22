import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      collections {
        collection_name
        products {
          _id
          product_name
          stock
          description
          purchased
          price
          condition
          shipping_properties {
            height
            width
            depth
            weight
          }
          tags {
            _id
            tag_name
          }
        }
      }
    }
  }
`;
