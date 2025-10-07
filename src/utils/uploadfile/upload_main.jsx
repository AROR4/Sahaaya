// UploadComponent.jsx
import React, { useState } from "react";
import UploadManager from "./uploadmanager";
import CloudinaryUpload from "./strategies/cloudinary";
import S3Upload from "./strategies/s3";

export default function UploadComponent() {
  const [url, setUrl] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    try {
      // Select strategy dynamically
      const uploadManager = new UploadManager(new CloudinaryUpload());

      const uploadedUrl = await uploadManager.upload(file, token);
        // presignedUrl: "AWS_PRESIGNED_URL", // if using S3

      setUrl(uploadedUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

}
