import React, { useContext, useState } from 'react'
import { AuthContext } from "../context/AuthContext";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
// import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
// import storage from '../storage';
// import { auth } from "../firebaseSetup";
import axios from "axios";
import { async } from '@firebase/util';
import storage from '../storage';
import { Navigate, useNavigate } from 'react-router-dom';
// function UploadImage(){
//   function toArrayBuffer(buf:Buffer) {
//     const ab = new ArrayBuffer(buf.length);
//     const view = new Uint8Array(ab);
//     for (let i = 0; i < buf.length; ++i) {
//         view[i] = buf[i];
//     }
//     return ab;
// }
//     const [imageUrl,setImageUrl] = useState<string|any>();
//     const [postCaption, setPostCaption] = useState('');
//     const [url,setUrl] = useState("");
//     const user = useContext(AuthContext);
//     const postImage = {
//         userId:user?.uid,
//         image:imageUrl
//     }
//     // let formData = new FormData();
//     // if(user?.uid){
//     //     formData.append("useId",user?.uid)
//     // }
//     // formData.append("image",imageUrl)
    
//     const handleUpload = async() => {
//     const storageRef = ref(storage, imageUrl?.name)
//     // let uploadTask: UploadTask
//     if (imageUrl) {
//     //   uploadBytesResumable(storageRef, imageUrl).then(async()=>{
//     //     // alert("Uploaded")
//     //      await getDownloadURL(storageRef).then((url)=>{
//     //           setUrl(url);
//     //       })
//     //       .catch((error)=>{
//     //         console.log(error.message,"Error");
//     //       })     
//     //   }).catch((error)=>{
//     //     console.log(error.message,"Error");
//     //   })
//     const newImage = "d";
//     // const ArrayBuff = toArrayBuffer(newImage)
//     const upload = await uploadBytesResumable(storageRef,imageUrl);
//     const downloadUrl = await getDownloadURL(storageRef);
//     if(downloadUrl){
//         const postObj = {
//             userId:user?.uid,
//             image: downloadUrl,
//             caption: postCaption,
//           }
//         console.log(downloadUrl);
//         // const result = await axios.post('http://localhost:90/uploadPost', postObj)
//           // setImageUrl("");
//     }
//     }
//     setUrl("");
// }

//     const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
//         if(e.target.files!=null && e.target.files[0]!=null){
//             setImageUrl(e.target.files[0]);
//         }
//     }
//   return (
//     <div>
//         <input type="file"  onChange={handleInputChange}/>
//         <textarea     value={postCaption}
//                       onChange={e => setPostCaption(e.target.value)}
//                       rows={11}
//                       cols={45}
//                       placeholder="Add Caption"
//                     />
//         <button onClick={handleUpload}>Upload Image</button>
//     </div>
//   )
// }
function UploadImage(){
    const [fileData,setFileData] = useState<string|any>();
    const [postCaption, setPostCaption] = useState('');
    const [url,setUrl] = useState("");
    const user = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files!=null && e.target.files[0]!=null){
            setFileData(e.target.files[0]);
        }
    }
    const handleUpload = async() => {
    const formData = new FormData();
    const postObj = {
        userId: user?.uid,
        image: formData,
        caption: postCaption,
      }
    formData.append('file',fileData);
    formData.append('userId', `${user?.uid}`);
    formData.append('caption',postCaption)
      try {
        const result = await axios.post('http://localhost:90/uploadPost',formData);
        console.log("Uploaded Succesfully")
        navigate("/")
        
      } catch (error) {
        console.log(error)
      }
}
  return (
    <div>
        <input type="file" id="file" name="file" onChange={handleInputChange}/> 
        <textarea     value={postCaption}
                      onChange={e => setPostCaption(e.target.value)}
                      id="caption"
                      name='caption'
                      rows={11}
                      cols={45}
                      placeholder="Add Caption"
                    />
        <button onClick={handleUpload}>Upload Image</button>
    </div>
  )
}

export default UploadImage;