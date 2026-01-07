import Style from '../nav/NavStyle.module.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../Home';
import ListUsers from '../ListUsers';
import PageBlog from '../../pages/BlogPage';
import ListBlogPerUser from '../listBlog/ListBlogPerUser';
import Login from '../login/Login';
import BlogPageSimple from '../../pages/blogPageSimple';
import BlogUnit from '../blogUnit';

const Nav = () => {
  const { login } = useSelector((state) => state);

  return (
    <>
      <nav className={Style['containerNav']}>
        <div>
          {/* <p style={{ display: 'initial' }}>hola</p>*/}
          <Link className={Style['link']} to="/">
            home
          </Link>
          <Link className={Style['link']} to="users">
            users
          </Link>
          <Link className={Style['link']} to="blogs">
            blogs
          </Link>
        </div>
        <div>
          {login && <p className={Style['partOfNav']}> {`${login.name} logged in `}</p>}
          <button
            className={Style['logOutButton']}
            onClick={() => {
              hadleLogOut();
            }}
          >
            logout
          </button>{' '}
        </div>
      </nav>

      {<h2 style={{ display: 'flex', justifyContent: 'center' }}> Blog app</h2>}

      <Routes>
        {/*   <Route path="/" element={login ? <Home /> : <Navigate replace to="/login" />} />*/}
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/users/:id" element={<ListBlogPerUser />} />
        {/*  <Route path="/blogs" element={<PageBlog />} />*/}
        <Route path="/blogs" element={<BlogPageSimple />} />
        <Route path="/blogs/:id" element={<BlogUnit />} />
        {/*<Route path="/login" element={login !== null ? <Navigate replace to="/" /> : <Login />} />*/}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Nav;
