import { apiClient } from "./api-client.js";
import { useAppStore } from "../store/index.js";

const upload = async (file, uploadTargetId) => {
  const { setUploadProgress, setUploadFileName, setUploadTargetId } =
    useAppStore.getState();

  setUploadTargetId(uploadTargetId);
  setUploadFileName(file.name);

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setUploadProgress(0);
        setUploadTargetId(undefined);
        setUploadFileName(undefined);
        resolve(response.fileUrl);
      } else {
        reject(`Upload failed with status: ${xhr.status}`);
      }
    });

    xhr.addEventListener("error", () => {
      setUploadProgress(0);
      setUploadTargetId(undefined);
      setUploadFileName(undefined);
      reject("Upload failed");
    });

    xhr.open(
      "POST",
      `${import.meta.env.VITE_SERVER_URL}/api/upload/upload-file`
    );
    xhr.withCredentials = true;
    xhr.send(formData);
  });
};

export default upload;
