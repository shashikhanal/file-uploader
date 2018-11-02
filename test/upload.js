process.env.NODE_ENV = 'test';

import { fileTypeValidator } from '../src/validators/fileTypeValidator';
import { fileHeaderValidator } from '../src/validators/fileHeaderValidator';
import * as errorHandler from '../src/middlewares/errorHandler';
import * as uploadFileService from '../src/services/uploadFileService';
import mock from 'mock-fs';
import fs from 'fs';

const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
let request = {},
  response = {};

/**
 * Unit test for file type validation
 */
describe('File type validator', function() {
  before(function(done) {
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/'
    });
    response = httpMocks.createResponse();

    done();
  });

  it('should allow JPG file', function(done) {
    request = {
      file: {
        mimetype: 'image/jpg'
      }
    };
    fileTypeValidator(request, response, function next() {
      expect(request.taskDone).to.be.true;
      done();
    });
  });

  it('should allow JPEG file', function(done) {
    request = {
      file: {
        mimetype: 'image/jpeg'
      }
    };
    fileTypeValidator(request, response, function next() {
      expect(request.taskDone).to.be.true;
      done();
    });
  });
});

/**
 * Unit test for file header validation
 */
describe('File header validator', function() {
  before(function(done) {
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/',
      headers: {
        'x-test': 'sampleName'
      }
    });
    response = httpMocks.createResponse();

    done();
  });

  it(`should only allow request which has 'x-test' header`, function(done) {
    fileHeaderValidator(request, response, function next() {
      expect(request.taskDone).to.be.true;
      done();
    });
  });
});

/**
 * Unit test for errorHandler
 */
describe('errorHandler', function() {
  before(function(done) {
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/'
    });
    response = httpMocks.createResponse();

    done();
  });

  it(`should set 405 status code for METHOD_NOT_ALLOWED`, function(done) {
    errorHandler.methodNotAllowed(request, response).then(res => {
      expect(res.error.code).to.be.equal(405);
      done();
    });
  });

  it(`should have correct error message for METHOD_NOT_ALLOWED`, function(done) {
    errorHandler.methodNotAllowed(request, response).then(res => {
      expect(res.error.message).to.be.equal('Method Not Allowed');
      done();
    });
  });
});

/**
 * Unit test for file upload
 */
describe('File upload', function() {
  let filePath = 'public/images/testName.webp';
  let fileName = 'testName';
  let req = {};
  before(function() {
    req = {
      file: {
        path: 'public/images/test.jpg',
        content: Buffer.from([8, 6, 7, 5, 3, 0, 9])
      }
    };
  });

  after(function() {
    mock.restore();
    fs.unlinkSync(filePath);
  });

  it(`should save uploaded file to local file system`, function(done) {
    uploadFileService.uploadFile(req, fileName).then(() => {
      expect(fs.existsSync(filePath)).to.be.true;
      done();
    });
  });
});
