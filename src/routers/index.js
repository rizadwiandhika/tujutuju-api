const express = require("express");
const { body, query, param } = require("express-validator");
const controllers = require("../controllers");
const { validation, auth } = require("../middlewares");

const Router = express.Router();

Router.use(express.json());

Router.get("/me", auth.isAuth, controllers.users.me);

Router.post(
  "/auth/login",
  body("email", "Invalid email").isEmail(),
  validation.isValid,
  controllers.auth.login
);
Router.post(
  "/auth/register",
  body("name", "Invalid name").isString().notEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "Invalid password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters"),
  validation.isValid,
  controllers.auth.register
);

Router.get(
  "/places",
  query("limit", "limit should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  query("page", "page should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  validation.isValid,
  controllers.places.index
);
Router.get(
  "/restaurants",
  query("limit", "limit should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  query("page", "page should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  validation.isValid,
  controllers.restaurants.index
);
Router.get(
  "/foods",
  query("limit", "limit should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  query("page", "page should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  controllers.foods.index
);
Router.get(
  "/places/:id/reviews",
  param("id", "id should be positive integer").isInt({ gt: 0 }),
  query("limit", "limit should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  query("page", "page should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  validation.isValid,
  controllers.reviews.place
);
Router.get(
  "/restaurants/:id/reviews",
  param("id", "id should be positive integer").isInt({ gt: 0 }),
  query("limit", "limit should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  query("page", "page should be positive integer")
    .if((value) => value)
    .isInt({ gt: 0 }),
  validation.isValid,
  controllers.reviews.restaurant
);

Router.use(controllers.errors.notFound);
Router.use(controllers.errors.internal);

module.exports = Router;
