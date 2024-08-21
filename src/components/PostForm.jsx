import React, { useCallback, useEffect, useState } from 'react';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import RTE from './RTE';
import Select from './Select';

function PostForm({ post }) {
  const navigate = useNavigate();
  const [error, setErrors] = useState("")

  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || " ",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {

   

    let file = null;
    // Ensure `data.imageFile` is defined and is an array
    if (data.imageFile && data.imageFile.length > 0) {
      file = await service.uploadFile(data.imageFile[0]);

      if (post) {
        if (file) {
          // Delete the old file if updating
          service.deleteFile(post.image); // Assuming post.image is the ID of the old image
        }

        const updpost = await service.updatePost(post.$id, {
          ...data,
          image: file ? file.$id : undefined,
          username: userData.name, // Automatically include username
          userId: userData.$id,    // Automatically include userId
        });

        // Update the post
        if (updpost) navigate(`/post/${updpost.$id}`);
      } else {
        // Creating a new post
        if (file) {
          data.image = file.$id;
        }

        const newpost = await service.createPost({
          ...data,
          userId: userData.$id,
          username: userData.name // Automatically include username
        });

        if (newpost) navigate(`/post/${newpost.$id}`);
      }
    } else {
      // Handle cases where `data.imageFile` is undefined or empty
      if (post) {
        const updpost = await service.updatePost(post.$id, {
          ...data,
          image: undefined, // Or keep the existing image if needed
          username: userData.name, // Automatically include username
          userId: userData.$id,    // Automatically include userId
        });
        if (updpost) navigate(`/post/${updpost.$id}`);
      } else {
        const newpost = await service.createPost({
          ...data,
          userId: userData.$id,
          username: userData.name // Automatically include username
        });
        if (newpost) navigate(`/post/${newpost.$id}`);
      }
    }
    const slug = slugTransform(data.title)
    if (slug) {
      setErrors(("A post with the same title already exists. Please choose a different title."))
    }
  };


  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }

    return '';
  }, []);


  useEffect(() => {
    const subscription = watch((value, { name }) => {

      try {
        if (name === 'title') {
          // Set the value of the 'slug' field based on the title
          setValue('slug', slugTransform(value.title), { shouldValidate: true });
        }
      } catch (error) {
        // Set error message if something goes wrong
        setErrors(error.message);
      }

    });


    return () => subscription.unsubscribe();  // Cleanup the subscription when the component unmounts
  }, [watch, setValue, setErrors]);


  return (
    <>
      <div className="bg padding pb-pf  ">
        <div className="post-card m-pf">
          <form onSubmit={handleSubmit(submit)}>
           
              <Input
                label={<label style={{ paddingRight: '12px' }} className='font-size-pf'>Title:</label>}
                className="mb-pf  input-width"
                placeholder="Title"
                {...register("title", { required: true })}
              />

              <Input
                label={<label style={{ paddingRight: '12px' }} className='font-size-pf'>Slug:</label>}
                className="mb-pf input-width"
                placeholder="Slug"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value));
                }}
              />

              <RTE
                label={<label style={{ paddingRight: '12px' }} className='font-size-pf'>Content: <span className='font-size'>(required)</span> </label>}
                className="mb-pf"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
              <span className='limit'>Note: max-word limit is 1000</span>
            

            <div className="flex-pf margin-pf">
              <Input
                label={<label className='style-pf font-size-pf'>Add Image:</label>}
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                placeholder="Image"
                {...register("imageFile")} // Renamed from `image` to `imageFile`

              />
              {post && post.image && (
                <img src={service.getfilePreview(post.image)} className='img' />
              )}
            </div>

            <div className="flex-pf margin-pf ">
              <Select
                label={<label style={{ paddingRight: '12px' }} className='font-size-pf'>Status:</label>}
                className="btn-logout"

                options={["active", "draft"]}
                {...register("status", { required: true })}
              />
            </div>
            <div >
              <button type="submit" className='btn-logout hover mt-30'>
                {post ? "Update" : "Submit"}
              </button>

              {error && <p className='no-post text-center'> {error} </p>}
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default PostForm;
