import React from 'react'
function Footer({data,link}:footerInterface) {
  return (
    <div className='footer_data'>
        <a href={link}><span>{data}</span></a>
    </div>
  )
}

export default Footer
