import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import EditPost from "./Pages/EditPost.jsx";
import Post from "./Pages/Post.jsx";
import AllPosts from "./Pages/AllPost.jsx";
import AddPost from './Pages/AddPost.jsx'
import PageNotFound from './Pages/PageNotFound.jsx'
import MyPosts from './Pages/MyPost.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: '/my-post',
        element: (<AuthLayout authentication>
          <MyPosts />
        </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },

      // 🛑 404 Page - Catch-All Route (MUST BE LAST)
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
