import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (req, file, callback) => {
          const hash = crypto.randomBytes(16).toString("hex");
          const fileName = `${hash}_${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
