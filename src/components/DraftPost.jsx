import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../appwrite/config';
import PostForm from './PostForm';


function DraftPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    


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

    if (!post) {
        return <div>Loading...</div>;
    }

   
    return (
        <>
            {post ? (
                <PostForm post={post} />
            ) : null}
        </>
    );
}

export default DraftPost;

