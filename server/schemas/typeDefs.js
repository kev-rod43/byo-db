const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        collections: [Collection]
    }

    type Product {
        _id: ID!
        product_name: String!
        stock: Int!
        description: String
        purchased: Float
        price: Float
        condition: String
        shipping_properties: Shipping
        tags: [Tag]
    }

    input ProductInput{
        product_name: String!
        stock: Int!
        description: String
        purchased: Float
        price: Float
        condition: String
        shipping_properties: ShippingInput
        tags: [TagInput]
    }

    type Shipping {
        height: Float
        width: Float
        depth: Float
        weight: Float
    }

    input ShippingInput {
        height: Float
        width: Float
        depth: Float
        weight: Float
    }

    type Tag {
        _id: ID!
        tag_name: String!
    }

    input TagInput {
        tag_name: String!
    }

    type Collection {
        collection_name: String!
        products: [Product]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateCollection(currentName: String!, newName: String!): User
        createCollection(collectionName: String!): User
        deleteCollection(collectionName: String!): User
        createProduct(collectionName: String!, productInput: ProductInput!): User
        deleteProduct(collectionName: String!, productId: ID!): User
        updateProduct(collectionName: String!, updatedProductObject: ProductInput!, productId: ID!): User
    }
`;

module.exports = typeDefs;
