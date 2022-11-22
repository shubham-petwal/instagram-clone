import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { UploadModalBodyDiv } from './styledComponents/UploadModal.style';

interface PropsInterface {
    method: string;
    isModalOpen:boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    header:string
  }

function UploadModal(props:PropsInterface) {
    const [fileData, setFileData] = useState<string | any>();
    const [postCaption, setPostCaption] = useState("");
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
      <>
        <Modal show={props.isModalOpen} onHide={()=>props.setModalIsOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{props.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UploadModalBodyDiv> 
          <input type="file" className="custom-file-input" name="file"  onChange={handleInputChange} />
            </UploadModalBodyDiv>
      <br/>
      {props.method == "uploadPost" ? (
        <textarea
          value={postCaption}
          onChange={(e) => setPostCaption(e.target.value)}
          id="caption"
          name="caption"
          rows={7}
          cols={37}
          style = {{padding : "10px"}}
          placeholder="Add Caption"
        />
      ) : null}

          </Modal.Body>
          <Modal.Footer>
            <Button style={{"background":"#0095f6","color":"white"}} onClick={handleUpload}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UploadModal