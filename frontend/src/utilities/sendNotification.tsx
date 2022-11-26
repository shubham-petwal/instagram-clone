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
        Authorization: "key=AAAAfnSlWp8:APA91bFM7rxUWs676b6xemiF88RC0NfIa_soggS8NS9O-oETXP21c91VQdFBApX8GYHhUGQCEoEZ6FQXiLXYjUgA99Z1BV3-Z-54p9Ek718ubDFXHpdzPEaT9_iu0EY5K8eQHExUB2pB",
        "Content-Type":"application/json"
      }),
      body: JSON.stringify(body)
    }

    fetch("https://fcm.googleapis.com/fcm/send", options).then(res=>{
      console.log(res)
      console.log("SENT")
    }).catch((e)=>console.log(e))
  }