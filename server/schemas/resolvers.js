const { User, Product } = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.find({ _id: context.user._id }).select("__v");
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

    deleteUser: async (parent, {userID}) => {
      const deletedUser = await User.findOneAndDelete(
        {_id: userID}
      );

      return deletedUser;
    },

    login: async (parent, { email, password }) => {
      try {
        const user = User.findOne({ email });

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

    addProduct: async (parent, { product_name, stock, description, purchased, price, condition, shipping_properties, tag_name}) => {
      const product = await Product.create({product_name, stock, description, purchased, price, condition, shipping_properties, tag_name});

      return product;
    },

    deleteProduct: async (parent, { productID }) => {
      return Product.findOneAndDelete(
        { _id: productID },
      );
    },
  },
};

module.exports = resolvers;
