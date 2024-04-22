import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation updateCollection($currentName: String!, $newName: String!) {
    updateCollection(currentName: $currentName, newName: $newName) {
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

export const CREATE_COLLECTION = gql`
  mutation createCollection($collectionName: String!) {
    createCollection(collectionName: $collectionName) {
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

export const DELETE_COLLECTION = gql`
  mutation deleteCollection($collectionName: String!) {
    deleteCollection(collectionName: $collectionName) {
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

export const CREATE_PRODUCT = gql`
  mutation createProduct($collectionName: String!, $productInput: ProductInput!) {
    createProduct(collectionName: $collectionName, productInput: $productInput) {
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

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($collectionName: String!, $productId: ID!) {
    deleteProduct(collectionName: $collectionName, productId: $productId) {
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

export const UPDATE_PRODUCT = gql`
 mutation updateProduct($collectionName: String!, $updatedProductObject: ProductInput!, $productId: ID!) {
  updateProduct(collectionName: $collectionName, updatedProductObject: $updatedProductObject, productId: $productId) {
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
`