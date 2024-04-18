const { User, Product } = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.find({ _id: context.user._id }).select("__v").populate("tags");
      }
      throw new AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const newUser = User.create(args);
        const token = signToken(newUser);

        return { token, newUser };
      } catch (err) {
        console.error(err);
        return;
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = User.findOne({ email }).populate("tags");

        if (!user) {
          throw new AuthenticationError;
        }

        const validPassword = user.isCorrectPassword(password);

        if (!validPassword) {
          throw new AuthenticationError;
        }
      } catch (err) {
        console.error(err);
        return;
      }
    },
  },
};

module.exports = resolvers;
