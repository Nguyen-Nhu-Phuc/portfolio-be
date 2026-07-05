import { cloudinary } from "../config/cloudinary";

export async function uploadImageToCloudinary(
  buffer: Buffer,
  mimetype?: string
): Promise<string> {
  const folder = process.env.CLOUDINARY_FOLDER || "portfolio";
  const isSvg =
    mimetype === "image/svg+xml" ||
    mimetype === "image/svg";

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        ...(isSvg ? { format: "svg" } : {}),
      },
      (error, uploadResult) => {
        if (error || !uploadResult?.secure_url) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve({ secure_url: uploadResult.secure_url });
      }
    );
    stream.end(buffer);
  });

  return result.secure_url;
}
