// const bucket = require("./bucket")
// const storage = require("./storage");

// function uploadImageToBucket(folderName,req){
//     const { userId, caption } = req.body;
//     const newDate = new Date().toLocaleDateString();
//     bucket.upload("./uploads/"+req.file.filename, {
//       destination: folderName+req.file.filename,
//       gzip: true,
//       metadata: {
//         cacheControl: 'public, max-age=31536000'
//       }
//     }).then(() => {
//       const storageRef =  ref(storage, "Posts/"+req.file.filename)
//       getDownloadURL(storageRef).then((url)=>{      
//         const postObj = {
//           userId: userId,
//           image: url,
//           caption: caption,
//           postId: uuidv4(),
//           createdAt: newDate,
//         };
//         addDoc(collectionRef, postObj).then(()=>{
//           console.log("Document Added")
//           fs.unlink("uploads/"+req.file.filename,function(err){
//             if(err) return console.log(err);
//             console.log('file deleted successfully');
//             res.send({ success: true, message: "Uploaded Successfully" });
  
//        });
//         })
//       })
//     }).catch(err => {
//       console.error('ERROR:', err);
//     });
//   }

// module.exports = uploadImageToBucket();