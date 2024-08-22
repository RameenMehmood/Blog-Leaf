import React from 'react'
import { NavLink } from 'react-router-dom'
import Logoutbtn from './Logoutbtn'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
  
    {
      name: "Login",
      slug: "/login",
      //agr user authenticated nhi hai toh usy auth status false hai or usy login or signup button dikha do
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "Home",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "My Blogs",
      slug: "/myblogs",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    }

  ]

  return (
    <>

      <nav className='nav'>
        <div className="logo flex">
          <img src='/tropical-leaves.png' alt="" />
          <h1 className='name italic'>BlogLeaf</h1>
        </div>
        <ul className='nav-items'>
          {navItems.map((item) => item.active ? (
            <li key={item.name}>
              <NavLink
                to={item.slug}
                className={({ isActive }) => (isActive ? "isActive" : "")}
              >
                {item.name}
              </NavLink>
            </li>
          ) : null)}

          {authStatus && (
            <Logoutbtn />
          )}
        </ul>
      </nav>

    </>
  )
}

export default Navbar
