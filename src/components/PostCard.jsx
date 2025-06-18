import service from '../Appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}
      onClick={() => {
        sessionStorage.setItem("my-post-scroll", window.scrollY);
      }}>
      <div className="w-full border rounded-md p-4 h-full bg-[#111] hover:shadow-lg transition">
        <div className="w-full aspect-square mb-4 overflow-hidden rounded-md bg-gray-800">
          <img
            src={service.getFilePreview(String(featuredImage))}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard