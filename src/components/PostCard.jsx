import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import logo from '../assets/tropical-leaves.png'


function getPreviewContent(content, maxLength = 100) {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]+>/g, '');
  
  // Truncate content to maxLength and add ellipsis if needed
  if (plainText.length > maxLength) {
    return plainText.substring(0, maxLength) + '...';
  }
  return plainText;
}

//card which will have posts having file and content previews
function PostCard({ $id, username, title, image, content, createdAt, onUsernameClick }) {
  const previewContent = content ? getPreviewContent(content) : "No content available";
  return (
    <>
   
    <Link to={`/user-posts/${username}`}>
    <div className="flex-pf">
    <img src={logo} alt="" className='logo' />
      <h1 className='m-10' onClick={onUsernameClick}>
        {username}
      </h1>
      </div>
      </Link>

        <div className="card">
      <Link to={`/post/${$id}`} >
          <h3 className ="margin text-center">{title}</h3>
          <div className ="m-20 content">
            {content ? parse(previewContent) : "No content available"}
          {image && <img src={service.getfilePreview(image)} className='img' />}

          </div>
         <div className='date name'>  {new Date(createdAt).toLocaleString()}</div>


      </Link>
        </div>
      
    </>
  )
}

export default PostCard



