import Boom from 'boom';
import fs from 'fs';

const IMAGE_FORMAT = `.webp`;

export async function uploadFile(req) {
  let tmpPath = req.file.path;
  let targetPath = 'public/images/' + req.get('x-test') + IMAGE_FORMAT;

  let src = fs.createReadStream(tmpPath);
  let dest = fs.createWriteStream(targetPath);
  await src.pipe(dest);

  let hadError = false;
  src.on('error', function() {
    hadError = true;

    throw new Boom('Error uploading image.');
  });

  return src.on('end', function() {
    if (!hadError) {
      fs.unlink(tmpPath);

      return true;
    }
  });
}
