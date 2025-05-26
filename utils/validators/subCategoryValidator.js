const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id format'),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('subCategory required')
    .isLength({ min: 2 })
    .withMessage('Too short subCategory name')
    .isLength({ max: 32 })
    .withMessage('Too long subCategory name'),
   
  check('category').notEmpty().withMessage('category must not be empty ')
  .isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check('id')
  .isMongoId()
  .withMessage('Invalid subCategory id format')
  .notEmpty()
  . withMessage('subCategory must not be empty '),

  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    check('category').optional().isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id')
  .isMongoId()
  .withMessage('Invalid subCategory id format')
  .notEmpty()
  . withMessage('subCategory must not be empty '),
  validatorMiddleware,
];