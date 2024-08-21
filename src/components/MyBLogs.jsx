import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';
import parse from 'html-react-parser';
import Footer from './Footer';

function MyBLogs() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const username = userData ? userData.name : '';

    useEffect(() => {
        if (userData) {
            service.alluserPost(userData.$id)
                .then((response) => {
                    if (response) {
                        setPosts(response.documents);
                    }
                    setLoading(false); 
                });
        } else {
            setLoading(false); // Set loading to false if there's no user data
        }
    }, [userData]);

    const deletePost = (postId, imageId) => {
        service.deletePost(postId).then((status) => {
            if (status) {
                if (imageId) {
                    service.deleteFile(imageId);
                }
                setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== postId));
            }
        });
    };

    if (!posts) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className="bg pb-myblog">
          <h1 className='text-center p-up'>{username}</h1>
           
            {posts.map((post) => (
                <div className="padding ">
                <div className="card m-top left ">      
                <div className="" key={post.$id}>

                    {post.status === 'draft' ? (
                        <div>  
                            <h2 className='margin-h1'>{post.title}</h2>
                            <p className='m-20 '>This post is currently in draft.</p>
                            <div className='mt-50 flex-btn' >
                                <div className="gap-btn">
                            <Link to={`/draft-post/${post.$id}`}>
                                <button className='btn-logout hover'>View Draft</button>

                            </Link>
                                <button className='btn-logout hover' onClick={() => deletePost(post.$id, post.image)}>Delete</button>
                                </div>
                                <div className='date'>  {new Date(post.createdAt).toLocaleString()}</div>
                                </div>

                        </div>
                    ) : (
                        <>
                        
                             <h1 className='margin'>{post.title}</h1>
                         <div className=" m-20 f-15 ">
                            <div className="mb-pf">
                    {post.content ? parse(post.content) : "No content available" }
                    </div>
                         {post.image && (
                                <img src={service.getfilePreview(post.image)}  className='img-myblog' />
                            )}
 
                             </div>
                            <div className="mt-50 flex-btn ">
                                <div className='gap-btn'>
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className='btn-logout hover ' >Edit</button>
                                </Link>
                                <button className='btn-logout hover' onClick={() => deletePost(post.$id, post.image)}>Delete</button>
                                </div>
                                <div className='date name'>  {new Date(post.createdAt).toLocaleString()}</div>
                            </div>
                            
                           
                        </>
                        
                    )}
                    </div>
                    
                </div>
                </div>
            ))}
            <Footer/>
            
            </div>
            
        </>
    );
}

export default MyBLogs;







