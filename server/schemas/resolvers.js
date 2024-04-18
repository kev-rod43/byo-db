const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }
      throw new AuthenticationError;
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
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError;
        }

        const validPassword = await user.isCorrectPassword(password);

        if (!validPassword) {
          throw new AuthenticationError;
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
    }
  },
};

module.exports = resolvers;
