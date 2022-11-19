import styled, { css } from "styled-components";
import { globalFacebookColor } from "./utilityFiles/variables";

export const UploadModalBodyDiv = styled.div`
.custom-file-input::-webkit-file-upload-button {
  display: none;
}
.custom-file-input::before {
  content: 'Select some file';
  display: inline-block;
  background: ${globalFacebookColor};
  color: white;
  border: 1px solid #999;
  border-radius: 7px;
  margin-top: 10px;
  padding: 5px 8px;
  margin-right: 5px;
  cursor: pointer;
  font-weight: 700;
}
.custom-file-input{
    color:${globalFacebookColor};
}
`