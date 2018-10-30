import Boom from 'boom';
const TYPE_JPG = 'image/jpg';
const TYPE_JPEG = 'image/jpeg';

/**
 * File type validator
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function fileTypeValidator(req, res, next) {
  if (req.file.mimetype === TYPE_JPG || req.file.mimetype === TYPE_JPEG) {
    return next();
  }

  throw new Boom('Unsupported file type. JPG/JPEG only supported.');
}

export { fileTypeValidator };
