import React, { useState } from "react";
import axios from "axios";
import file from "./fileupload.module.css";

function FileUpload() {
  const [input, setInput] = useState({
    fieldname: "",
  });

  const [error, setError] = useState("");

  const [img, setImg] = useState("");

  const handleChange = ({ target: input }) => {
    const newInput = { ...input };

    newInput[input.name] = input.value;
    setInput(newInput);
  };

  const fileChange = ({ target: input }) => {
    setImg(input.files[0]);
  };

  const handleUpload = async () => {
    if (!input.fieldname) return setError("Input is empty");
    if (!img) return setError("No image selected");

    const formData = new FormData();
    formData.append("avatar", img);

    const config = {
      header: {
        "Content-Type": "image/jpg",
      },
    };

    try {
      const { data } = await axios.post("/images/upload", formData, config);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={file.container}>
      <div className={file.formInput}>
        <input type="file" name="image" onChange={fileChange} />
      </div>

      <div className={file.formInput}>
        <input
          type="text"
          name="fieldname"
          value={input.fieldname}
          onChange={handleChange}
        />
      </div>

      {error && <p>{error}</p>}

      <div className={file.formInput}>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default FileUpload;
