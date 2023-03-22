const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    }, 
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    role: {
        type: String,
        default: 'user'
    },
    employeeId: {
        type: Number,
        default: 1,
    }
},
    {
        timestamps: true
    }
);


// Define a pre-save hook to increment employeeId
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew) {
      try {
        const count = await User.countDocuments();
        user.employeeId = count + 1; // Increment employeeId by 1
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;