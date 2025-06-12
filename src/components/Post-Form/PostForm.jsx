import { useCallback, useEffect, } from 'react'
import service from '../../Appwrite/config'
import { useForm } from 'react-hook-form'
import { Button, Input, Loader, RTE, Select } from '../index'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader, hideLoader } from '../../Store/loaderSlice'

export default function PostForm({ post }) {
  const { slug } = useParams();
  const loading = useSelector((state) => state.loader.loading);
  const dispatch = useDispatch();

  // For useForm hook
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    // Passing default values if the user came to edit a post or shwoing empty value if the user want to create a post
    defaultValues: {
      title: post?.title || '',
      slug: slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    dispatch(showLoader())
    const loaderAnimation = setTimeout(() => {
      dispatch(hideLoader())
    }, 1000)
    return (() => clearTimeout(loaderAnimation));
  }, [])


  // Handle Submit of form
  const submit = async (data) => {
    /*
      If post exit :
      1. upload new image
      2. delete the previews image
      3. updating the post
      4. Navigating at the end
  
      else :
      1. uploading the image
      2. creating the post 
      3. Navigating at the end 
    */
    dispatch(showLoader())
    if (post) {
      // updating Deleting preview image
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
      if (file) {
        await service.deleteFile(post.featuredImage)
      }

      // Updating post and redirecting
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage
      })
        .catch((error) => {
          console.log('Something went wrong:', error);
        })
        .finally(() => dispatch(hideLoader()));
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {

      // TODO : we can check if file image is there or not
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({ ...data, userId: userData.$id })
          .catch((error) => {
            console.log('Something went wrong:', error);
          })
          .finally(() => dispatch(hideLoader()));

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  }

  // Trasforming the title to url/slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    }
    return '';
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
      }
    })

    // For memory efficiency
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue])

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="md:w-2/3 w-full px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-full md:w-1/3 px-2 md:mt-0 mt-4">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  )
}
