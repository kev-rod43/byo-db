import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      collections {
        name
        products {
          product_name
          stock
          description
          purchased
          price
          condition
          shipping_properties
          tag {
            tag_name
          }
        }
      }
    }
  }
`;
