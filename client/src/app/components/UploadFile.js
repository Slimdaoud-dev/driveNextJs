import axios from "axios";
import { useState } from "react";

const FileUpload = ({ account, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "50afec913bad1976c9b6";
  const SECRET_API_KEY =
    "499c86fa675591970e3ea111d8de676e79448ceb96761e583a44f6c8536f8822";
  const PINATA_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const retrieveFile = (event) => {
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFile(event.target.files[0]);
    };

    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios.post(PINATA_API_URL, formData, {
          headers: {
            pinata_api_key: API_KEY,
            pinata_secret_api_key: SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, imgHash);

        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        setError(
          error.message || "An error occurred while uploading the file."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-6" data-te-input-wrapper-init="">
          <label>Choose File</label>

          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={retrieveFile}
            disabled={!account || loading}
          />
          <span className="textArea">Image: {fileName}</span>
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          data-te-ripple-init=""
          data-te-ripple-color="light"
          className="mb-6 inline-block w-full rounded-full bg-black px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Upload
        </button>
      </form>
    </div>
  );
};
export default FileUpload;
