import service from '../Appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full border rounded-md p-4 h-full bg-[#111]'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(String(featuredImage)) } alt={title}
                        className='rounded-md min-h-70 object-cover' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard