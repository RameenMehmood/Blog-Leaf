import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import mystore from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import AllPosts from './components/AllPosts.jsx'
import PostForm from './components/PostForm.jsx'
import EditPost from './components/EditPost.jsx'
import IndividualPost from './components/IndividualPost.jsx'
import DraftPost from './components/DraftPost.jsx'
import MyBLogs from './components/MyBLogs.jsx'
import UserProfile from './components/UserProfile.jsx'
import Welcome from './components/Welcome.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
       {
        path: "/",
        element: ( <AuthLayout authentication={false}>
        <Welcome /> 
         </AuthLayout>
       )
      },
       {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
         <Login /> 
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )

      },
      {
        path: "/all-posts",
        element: (<AuthLayout authentication={true}>
          <AllPosts />
        </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>
            <PostForm />
          </AuthLayout>)
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>)
      },
      {
        path: "/post/:slug",
        element: <IndividualPost />
      },
      {
        path: "/draft-post/:slug",
        element:<DraftPost/>
      },
      {
        path:"/myblogs",
        element:<MyBLogs/>
      },
      {
        path:"/user-posts/:username",
        element:<UserProfile/>
      }

    ]
   
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={mystore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
