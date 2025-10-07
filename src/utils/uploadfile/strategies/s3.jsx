
import axios from "axios";

export default class S3Upload {
  async upload(file) {
    try {
 
      const { data } = await axios.get("http://localhost:5152/api/presigned-url", {
        params: { fileName: file.name, fileType: file.type },
      });

      const { url } = data;


      await axios.put(url, file, {
        headers: { "Content-Type": file.type },
      });

      return url.split("?")[0];
    } catch (err) {
      console.error("S3 upload failed:", err);
      throw err;
    }
  }
}
