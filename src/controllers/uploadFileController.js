import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as uploadFileService from '../services/uploadFileService';
import { fileHeaderValidator } from '../validators/fileHeaderValidator';
import { fileTypeValidator } from '../validators/fileTypeValidator';
import multer from 'multer';
let upload = multer({ dest: 'public/images/' });

const router = Router();

/**
 * Uploads image
 */
router.post('/', fileHeaderValidator, upload.single('name'), fileTypeValidator, (req, res, next) => {
  try {
    let response = uploadFileService.uploadFile(req);

    if (response) {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        message: req.file.originalname + ' is uploaded successfully.'
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
