const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.error(err);
        ;
      }
    },

    deleteUser: async (parent, {userID}) => {
      const deletedUser = await User.findOneAndDelete(
        {_id: userID}
      );

      return deletedUser;
    },

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }

        const validPassword = await user.isCorrectPassword(password);

        if (!validPassword) {
          throw AuthenticationError;
        }
        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.error(err);
        return ;
      }
    },
    createCollection: async (parent, { collectionName }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { collections: { collection_name: collectionName } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError
    },
    updateCollection: async (parent, { currentName, newName }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id, 'collections.collection_name': currentName },
          { $set: { 'collections.$.collection_name': newName } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError
    },
    deleteCollection: async (parent, { collectionName }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id, 'collections.collection_name': collectionName },
          { $pull: { collections: {collection_name: collectionName}} },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError
    },
    createProduct: async (parent, { collectionName, productInput }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id, 'collections.collection_name': collectionName },
          { $addToSet: { 'collections.$.products': productInput} },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError
    },
    deleteProduct: async (parent, { collectionName, productId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id, 'collections.collection_name': collectionName },
          { $pull: { 'collections.$.products': { _id: productId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError
    },
    updateProduct: async (parent, { collectionName,updatedProductObject, productId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id, },
        );
        const foundCollection = updatedUser.collections.filter((collection) => collection.collection_name === collectionName);
        foundCollection[0].products[foundCollection[0].products.findIndex((product)=>product._id == productId)] = updatedProductObject;
        updatedUser.collections[updatedUser.collections.findIndex((collection) => collection.collection_name === collectionName)] = foundCollection[0];
        updatedUser.save()
        return updatedUser;
      }
      throw AuthenticationError
    },
    

  },

};

module.exports = resolvers;
