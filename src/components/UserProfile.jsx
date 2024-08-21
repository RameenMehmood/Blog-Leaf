import React from 'react';
import { useParams } from 'react-router-dom';
import service from '../appwrite/config';
import parse from 'html-react-parser';

const UserProfile = () => {
    const { username } = useParams(); // Get the username from the URL
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (username) {
            service.userProfile(username)
                .then((response) => {
                    if (response) {
                        setPosts(response.documents);
                    }
                    setLoading(false);
                    
                })
                
        } else {
            setLoading(false); // Set loading to false if there's no username
        }
    }, [username]);
    if (error) return <p>{error}</p>;

    return (
        <div className='bg pb-i '>
            <h1 className='p-up'> {username}</h1> {/* Display the username from the URL */}
         
            {posts.map((post) => (
                <div className="padding " key={post.$id}>
                <>
                   <div  className='card m-top left ' >
                    <h1 className='margin'>{post.title}</h1>
                    <div className="m-20">
                    {post.content ? parse(post.content) : "No content available"}
                    {post.image && <img src={service.getfilePreview(post.image)} className='img-myblog' />}
                    </div>
                    <div className='date float name'>  {new Date(post.createdAt).toLocaleString()}</div>
                    </div> 
                    </>
                </div>
            ))}
            
            
        </div>
    );
};

export default UserProfile;
