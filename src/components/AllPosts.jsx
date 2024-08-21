import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import PostCard from './PostCard'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Footer from './Footer'


//display all posts

function AllPosts() {
  const {register,watch}=useForm()
    const [posts,setPosts]=useState([])
    const navigate=useNavigate()
    const searchQuery=watch('search')
    
    
   useEffect(() => {
     
    service.allPost([])
    .then((response)=>{
        if(response){
           setPosts(response.documents)
         
        }
    })
   
    }, [])

    useEffect(() => {
      if(searchQuery)
      service.searchallPost(searchQuery)
      .then((response)=>{
        if(response){
          setPosts(response.documents)
        }
      })
      else{
        service.allPost()
        .then((response) => {
          if (response) {
            setPosts(response.documents);
          }
          
        })
      }
    }, [searchQuery])
    

    const handleUsernameClick = (username) => {
      navigate(`/user-posts/${username}`);
  };
  if (!posts) {
    return <div>Loading...</div>;
}

  return (
    <>
          
      <div className="bg pb-ap  ">
        <div className="search ">
        <div className="search-bar">
         
      <Input
        
        placeholder="Search by title"
        {...register("search")}
        />
        </div>
        </div>
        
            {posts.map((post)=>(
            <div className="padding" key={post.$id}>
                <PostCard {...post}
               username = { post.username || "unknown"}
               onUsernameClick={() => handleUsernameClick(post.username)}
                  
               />
                
                  </div>
              
            ))}
             {posts.length === 0 && <div className="h-full"><h2 className='no-post text-center italic'> No post available</h2></div>}

            <Footer/>
      </div>
    </>
  )
}



export default AllPosts



