import Style from '../nav/NavStyle.module.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../Home';
import ListUsers from '../listUsers/ListUsers';
import ListUsersBoostrap from '../listUsers/ListUsersBoostrap';
import PageBlog from '../../pages/BlogPage';
import ListBlogPerUser from '../listBlog/ListBlogPerUser';
import Login from '../login/Login';
import BlogPageSimple from '../../pages/blogPageSimple';
import BlogUnit from '../blogUnit';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBootstrap = () => {
  const { login } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hadleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch({
      type: 'login/setLogin',
      payload: null,
    });
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{ background: 'black' }}>
          <Navbar.Brand style={{ color: '#5ab3eb' }} href="#home">
            BlogApp
          </Navbar.Brand>
          <Navbar.Toggle style={{ color: '#5ab3eb', background: '#5ab3eb' }} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse style={{ color: '#5ab3eb' }} id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ color: '#5ab3eb' }} href="/" to="/">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: '#5ab3eb' }} href="users" to="users">
                users
              </Nav.Link>
              <Nav.Link style={{ color: '#5ab3eb' }} href="blogs" to="blogs">
                blogs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse style={{ color: '#5ab3eb' }} className="justify-content-end">
            <Navbar.Text style={{ color: '#5ab3eb' }}>
              {`${login.name} logged in `}
              <button
                onClick={() => {
                  hadleLogOut();
                }}
                style={{ color: '#5ab3eb' }}
                href="#login"
              >
                logout
              </button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        {login ? (
          <>
            {/*   <Route path="/" element={login ? <Home /> : <Navigate replace to="/login" />} />*/}
            <Route path="/" element={<Home />} />
            {/*<Route path="/users" element={<ListUsers />} />*/}
            {<Route path="/users" element={<ListUsersBoostrap />} />}
            <Route path="/users/:id" element={<ListBlogPerUser />} />
            {/*<Route path="/blogs" element={<PageBlog />} />*/}
            {<Route path="/blogs" element={<BlogPageSimple />} />}
            {<Route path="/blogs/:id" element={<BlogUnit />} />}
            {/*<Route path="/login" element={login !== null ? <Navigate replace to="/" /> : <Login />} />*/}
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </>
  );
};

export default NavBootstrap;
