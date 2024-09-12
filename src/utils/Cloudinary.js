import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Uplpadoncloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) {
      return res.status(404).json({ error: "file not found" });
    }

    const response = await cloudinary.uploader.upload(
      localfilepath,

      {
        resource_type: "auto",
      }
    );
    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath); // remove localy saved file as upload operation got failed
    return null;
  }
};

export { Uplpadoncloudinary };
