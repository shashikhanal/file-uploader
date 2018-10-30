import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import { fileHeaderValidator } from '../validators/fileHeaderValidator';
import { fileTypeValidator } from '../validators/fileTypeValidator';
let multer = require('multer');
let upload = multer({ dest: 'public/images/' });
let fs = require('fs');

const router = Router();
const IMAGE_FORMAT = `.webp`;

/**
 * Uploads image
 */
router.post('/', fileHeaderValidator, upload.single('name'), fileTypeValidator, (req, res, next) => {
  let tmpPath = req.file.path;
  let targetPath = 'public/images/' + req.get('x-test') + IMAGE_FORMAT;

  let src = fs.createReadStream(tmpPath);
  let dest = fs.createWriteStream(targetPath);
  src.pipe(dest);

  let hadError = false;
  src.on('error', function() {
    hadError = true;

    res.status(HttpStatus.ERROR).json({
      status: HttpStatus.ERROR,
      success: false,
      message: req.file.originalname + ' is not uploaded.'
    });
  });

  src.on('end', function() {
    if (!hadError) {
      fs.unlink(tmpPath);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: req.file.originalname + ' is uploaded successfully.'
      });
    }
  });
});

export default router;
