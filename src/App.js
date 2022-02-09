import imageCompression from "browser-image-compression";
import React, { useState } from "react";

export default function App() {
  const [upload, setUpload] = useState("");
  const [file, setFile] = useState("");
  const [compress, setCompress] = useState("");
  const [download, setDownload] = useState("");

  const handler = (e) => {
    setUpload(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    setDownload(e.target.files[0].name);
  };

  const handlecompress = (e) => {
    e.preventDefault();

    if (!file) {
      alert("please upload image");
      return 0;
    }

    const option = {
      maxsizeMB: 10,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    if (option.maxsizeMB > 10) {
      alert("please select a small image size !");
      return 0;
    }

    imageCompression(upload, option).then((x) => {
      const downloadlink = URL.createObjectURL(x);
      console.log(x, downloadlink);
      setCompress(downloadlink);
    });
  };

  return (
    <div
      className="flex justify-center items-center mt-12"
      style={{ height: 600 }}
    >
      <div className="flex-col justify-center">
        {file ? (
          <img
            src={file}
            className="rounded-md border-4"
            alt="img"
            style={{ width: 400, height: 400 }}
          />
        ) : (
          <div
            className="flex justify-center items-center border-2"
            style={{ width: 400, height: 400 }}
          >
            upload image ...
          </div>
        )}
        <div className="flex justify-between">
          <label
            htmlFor="upload"
            className="bg-green-600 mt-4 px-4 py-3 rounded-sm text-white"
            role={"button"}
          >
            <input
              type="file"
              onChange={(e) => handler(e)}
              name="upload"
              id="upload"
              className="hidden"
            />
            Upload ...
          </label>
          {compress ? (
            <a
              href={compress}
              className="mt-4 text-lg text-white px-4 py-3 rounded-md bg-purple-500 hover:bg-purple-400"
              download={download}
            >
              download
            </a>
          ) : (
            <button
              className="mt-4 text-lg text-white border-2 p-2 rounded-md 
          bg-purple-500 hover:bg-purple-400"
              onClick={(e) => handlecompress(e)}
            >
              compress image
            </button>
          )}
        </div>
        {compress ? (
          <span className="pt-10 flex justify-center text-lg text-green-700">
            compressed image sucessesfully !
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
