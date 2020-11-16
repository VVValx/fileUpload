import React, { useState } from "react";
import axios from "axios";
import file from "./fileupload.module.css";

function FileUpload() {
  //   const [input, setInput] = useState({
  //     fieldname: "",
  //   });

  const [error, setError] = useState("");

  const [img, setImg] = useState({
    name: "",
    value: "",
  });

  const [width, setWidth] = useState(0);

  //   const handleChange = ({ target: input }) => {
  //     const newInput = { ...input };

  //     newInput[input.name] = input.value;
  //     setInput(newInput);
  //   };

  const fileChange = ({ target: input }) => {
    const newImg = { ...img };

    newImg.name = input.name;
    newImg.value = input.files[0];

    setImg(newImg);
  };

  const handleUpload = async () => {
    if (!img) return setError("No image selected");

    const formData = new FormData();
    formData.append(img.name, img.value);

    try {
      await axios.post("/images/upload", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = (loaded / total) * 100;
          setWidth(percent);
        },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const barBackground = () => {
    let background = "#f08080";
    if (width >= 50) background = "#ff8c00";
    if (width === 100) background = "#006400";
    return background;
  };

  return (
    <div className={file.container}>
      <div className={file.formInput}>
        <input type="file" name="image" onChange={fileChange} />
      </div>

      {/* <div className={file.formInput}>
        <input
          type="text"
          name="fieldname"
          value={input.fieldname}
          onChange={handleChange}
        />
      </div> */}

      <div className={file.formInput}>
        <div className={file.outerBar}>
          <div
            className={file.innerBar}
            style={{ width: `${width}%`, background: barBackground() }}
          >
            {width === 100 ? "Uploaded!" : `${width}%`}
          </div>
        </div>
      </div>

      <div className={file.formInput}>{error && <p>{error}</p>}</div>

      <div className={file.formInput}>
        <button onClick={handleUpload}>Upload Image</button>
      </div>
    </div>
  );
}

export default FileUpload;
