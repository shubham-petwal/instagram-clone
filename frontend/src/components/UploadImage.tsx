import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface PropsInterface {
  method: string;
  isModalOpen:boolean
}

function UploadImage(props: PropsInterface) {
  const [fileData, setFileData] = useState<string | any>();
  const [postCaption, setPostCaption] = useState("");
  const [url, setUrl] = useState("");
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null && e.target.files[0] != null) {
      setFileData(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("userId", `${user?.uid}`);
    if (props.method == "uploadPost") {
      formData.append("caption", postCaption); //---------conditionally
    }
    try {
      const result = await axios.post(
        `http://localhost:90/${props.method}`, //---------conditionally
        formData
      );
      console.log("Uploaded Succesfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input type="file" id="file" name="file" onChange={handleInputChange} />
      {/* conditionally Text Area render */}
      {props.method == "uploadPost" ? (
        <textarea
          value={postCaption}
          onChange={(e) => setPostCaption(e.target.value)}
          id="caption"
          name="caption"
          rows={11}
          cols={45}
          placeholder="Add Caption"
        />
      ) : null}

      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default UploadImage;
