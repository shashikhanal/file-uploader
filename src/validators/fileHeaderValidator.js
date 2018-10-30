import Joi from 'joi';
import validate from '../utils/validate';

const SCHEMA = Joi.string().required();

function fileHeaderValidator(req, res, next) {
  return validate(req.get('x-test'), SCHEMA)
    .then(() => next())
    .catch(err => {
      next(err);
    });
}

export { fileHeaderValidator };
