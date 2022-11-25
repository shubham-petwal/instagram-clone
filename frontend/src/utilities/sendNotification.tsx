export const sendNotification = (token:string,Notifi_title:string,Notifi_body:string,userId:string,profileImage:string,postImage:string)=>{
    let body = {
      to: token,
      notification:{
        title: Notifi_title,
        body:Notifi_body,
        click_action:"https://google.com"
      },
      data:{
        profileImage:profileImage,
        userId:userId,
        postImage:postImage
      }
    }
    
    let options = {
      method: "POST",
      headers: new Headers({
        Authorization: "key=AAAAfnSlWp8:APA91bH-KZ3UngzLMme_8e9vDt4jEw-HvSOI_BOX361qxxsJAOrkXM3ehUiadPywIqNqBeKnokDOVJmKO8jKLVhS5_8k0UzflLx4CuAin2SbTw_tsDYSdH3f9a37YJ6mGG3AxIXoWsZO",
        "Content-Type":"application/json"
      }),
      body: JSON.stringify(body)
    }

    fetch("https://fcm.googleapis.com/fcm/send", options).then(res=>{
      console.log(res)
      console.log("SENT")
    }).catch((e)=>console.log(e))
  }