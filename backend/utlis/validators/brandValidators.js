const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwares/validatorMiddelware");
const slugify = require("slugify");
exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand requires a name")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.UpdateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id"),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id"),
  validatorMiddleware,
];
