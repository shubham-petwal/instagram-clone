import React from 'react'

function ProfilePosts(props:any) {
    function handleClick(){
        props.getId(props.id)
    }
  return (
    <div onClick={handleClick}>
        <img height={props.height} width={props.width} src={props.src} alt="" />
    </div>
  )
}

export default ProfilePosts