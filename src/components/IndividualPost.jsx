import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import Footer from './Footer'

function IndividualPost() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((response) => {
                    if (response) {
                        setPost(response);
                    }
                })
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        if (post) {
            service.deletePost(post.$id).then((status) => {
                if (status) {
                    service.deleteFile(post.image);
                    navigate("/all-posts");
                }
            });
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="bg pb-i">
                <>
                    <div className="padding-indi">
                        <div className="card left-indi m-20 mt-30">
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

                            <div className="m-20">
                                {post.image && <img src={service.getfilePreview(post.image)} className='img-indi'/>
                                }
                             <div className='margin font-indi'>  {post.content ? parse(post.content) : "No content available"}</div> 
                               
                            </div>
                         
                            {isAuthor && (
                                <div className="mt-50 flex-btn">
                                    <div className="gap-btn">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <button className='btn-logout hover '>Edit</button>
                                    </Link>
                                    <button className='btn-logout hover ' onClick={deletePost}>Delete</button>
                                    </div>

                                </div>
                            )}
                                </>
                                )}
                        </div>

                    </div>
                </>
            <Footer/>
            </div>
        </>
    );
}

export default IndividualPost;
