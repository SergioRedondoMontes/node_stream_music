const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        isAsync: true,
        validator: function (value, isValid) {
          const self = this;
          return self.constructor
            .findOne({ email: value })
            .exec(function (err, user) {
              if (err) {
                throw err;
              } else if (user) {
                if (self.id === user.id) {
                  // if finding and saving then it's valid even for existing email
                  return isValid(true);
                }
                return isValid(false);
              } else {
                return isValid(true);
              }
            });
        },
        message: "The email address is already taken!",
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "singer", "admin"],
    },
    accessToken: {
      type: String,
    },
    resetPassword: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
