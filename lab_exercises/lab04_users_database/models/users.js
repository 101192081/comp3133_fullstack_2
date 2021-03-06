const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {type: String},

    username: {
      type: String,
      required: true,
      minLength: [4, 'Username must be 4 or more characters long']
    },

    email: {
      type: String,
      required: true,
      validate : {
        validator: function(v) {
          let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(v);
        },
        message: 'Email validation failed. Please provide a valid email address'
      }
    },

    address: {
      street: { type: String },
      suite: { type: String },
      city: {
        type: String,
        required: true,
        validate : {
          validator: function(v) {
            let cityRegex = /^[a-zA-Z ]*$/;
            return cityRegex.test(v);
          },
          message: 'City validation failed. Please ONLY use alphabets and space in the city name'
        }
      },
      zipcode: {
        type: String,
        required: true,
        validate : {
          validator: function(v) {
            let zipRegex = /^\d{5}(?:[- ]\d{4})?$/;
            return zipRegex.test(v);
          },
          message: 'Zip code validation failed. Please provide a correct zip code, in a valid format'
        }
      },
      geo: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },

    phone: {
      type: String,
      required: true,
      validate : {
        validator: function(v) {
          let phoneRegex = /\1([- ])?\d{3}-\d{3}-\d{4}$/;
          return phoneRegex.test(v);
        },
        message: 'Phone number validation failed. Please make sure that provided phone number is correct and is in the right format'
      }
    },

    website: {
      type: String,
      required: true,
      validate : {
        validator: function(v) {
          let webRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
          return webRegex.test(v);
        },
        message: 'Web/URL address validation failed. Please make sure that the provided url is valid'
      }
    },

    company: {
      name: { type: String },
      catchPhrase: { type: String },
      bs: { type: String }
    }
});

module.exports = mongoose.model("Users", usersSchema);
