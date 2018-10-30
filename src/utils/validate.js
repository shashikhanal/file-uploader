import Joi from 'joi';

/**
 * Utility helper for validation using Joi
 * @param data
 * @param schema
 * @returns {Promise}
 */
function validate(data, schema) {
  return Joi.validate(data, schema, { abortEarly: false }, err => {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.resolve(null);
  });
}

export default validate;
