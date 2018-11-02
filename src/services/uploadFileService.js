import fs from 'fs';

const IMAGE_FORMAT = `.webp`;

export async function uploadFile(req, fileName) {
  let tmpPath = req.file.path;
  let targetPath = 'public/images/' + fileName + IMAGE_FORMAT;

  let src = fs.createReadStream(tmpPath);
  let dest = fs.createWriteStream(targetPath);
  await src.pipe(dest);

  let hadError = false;
  src.on('error', function() {
    hadError = true;

    return false;
  });

  return src.on('end', function() {
    if (!hadError) {
      fs.unlink(tmpPath);

      return true;
    }
  });
}
