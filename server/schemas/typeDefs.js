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

    type Shipping {
        height: Float
        width: Float
        depth: Float
        weight: Float
    }

    type Tag {
        _id: ID!
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
    }
`;

module.exports = typeDefs;
