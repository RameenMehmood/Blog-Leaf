import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import PostForm from './PostForm';

// Edit post
function EditPost() {
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

    return (
        <>
            {post ? (
                <PostForm post={post} />
            ) : null}
           
        </>
    );
}

export default EditPost;
