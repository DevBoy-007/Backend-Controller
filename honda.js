const { submit_Car } = require("../Service/honda"); // Honda controller
const { display_Car } = require("../Service/honda");
const { update_Car } = require("../Service/honda");
const { delete_Car } = require("../Service/honda");
const joi = require("joi"); // import joi object from joi module
const submitvalidationschema = joi.object().keys({
  Vin: joi.string().required(),
  Url: joi.string().required(),
  Make: joi.string().required(),
  Model: joi.string().required(),
  Year: joi.string().required(),
  Body: joi.string().required(),
  Color: joi.string().required(),
  Fuel: joi.string().required(),
  Price: joi.string().required(),
});
module.exports = {
  submit_Car: async (req, res) => {
    try {
      const { Vin, Make, Model, Year, Body, Color, Fuel, Price } = req.body;
      // Handle file upload logic here
      const imageUrl = req.file ? req.file.path : "";
      const Car = { Vin,Url: imageUrl,Make,Model,Year,Body,Color,Fuel,Price};
      const validate = await submitvalidationschema.validateAsync(Car);
      const submitResponse = await submit_Car(validate);
      if (submitResponse.error) {
        return res.send({
          error: submitResponse.error,
        });
      }
      return res.send({
        response: submitResponse.response,
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  display_Car: async (req, res) => {
    try {
      const displayResponse = await display_Car();
      if (displayResponse.error) {
        return res.send({
          response: displayResponse.error,
        });
      }
      return res.send({
        response: displayResponse.response,
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  update_Car: async (req, res) => {
    try {
      const { Vin, Make, Model, Year, Body, Color, Fuel, Price } = req.body;
      // Handle file upload logic here
      const imageUrl = req.file ? req.file.path : "";
      const Car = {
        Vin,
        Url: imageUrl,
        Make,
        Model,
        Year,
        Body,
        Color,
        Fuel,
        Price,
      };
      const updateresponse = await update_Car(Car);
      if (updateresponse.error) {
        return res.send({
          error: updateresponse.error,
        });
      }
      return res.send({
        response: updateresponse.response,
      });
    } catch (error) {
      return res.send({
        error: "controller",
      });
    }
  },
 delete_Car: async (req, res) => {
    try {
      const deleteResponse = await delete_Car(req.query);
      if (deleteResponse.error) {
        return res.send({
          error: deleteResponse.error,
        });
      }
      return res.send({
        response: deleteResponse.response,
      });
    } catch (error) {
      return res.send({
        error: "controller",
      });
    }
  },
};
