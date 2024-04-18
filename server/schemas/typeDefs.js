const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        collections: [Collection]
    }

    type Product {
        product_name: String!
        stock: Int!
        description: String
        purchased: Float
        price: Float
        condition: String
        shipping_properties: Shipping
        tag: [Tag]
    }

    type Shipping {
        height: Float
        width: Float
        depth: Float
        weight: Float
    }

    type Tag {
        tag_name: String!
    }

    type Collection {
        collection_name: String!
        products: [Product]
    }

    input ProductData {
        product_name: String!
        stock: Int!
        description: String
        purchased: Float
        price: Float
        condition: String
        shipping_properties: ShippingData
        tag: [TagData]
    }

    input TagData {
        tag_name: String!
    }

    input ShippingData {
        height: Float
        width: Float
        depth: Float
        weight: Float
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        collections: [Collection]
        collection(collection_name: String!): Collection
        
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        deleteUser(_id: ID!): User
        addProduct(product: ProductData): Product
        deleteProduct(product_name: String!): Product
        addCollection(collection_name: String!, products: [ProductData] ): Collection
        deleteCollection(collection_name: String!): Collection
        applyTag(tag_name: String!): Tag
        unapplyTag(tag_name: String!): Tag
    }
`;

module.exports = typeDefs;
