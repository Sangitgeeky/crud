import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check_token } from './redux/AuthSlice';
import { Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Header from './component/Header';
import Course from './pages/Course';
import Blogpage from './pages/Blogpage';
import Blogdetails from './pages/Blogdetails';
import SearchData from './pages/SearchData';
import Courseform from './pages/Courseform';
import Contact from './pages/Contact';
import CategorywithPost from './pages/CategorywithPost';

function App() {
  const dispatch = useDispatch();
 // check token avable or not
  function PrivateRoute({ children }) {
    const token =localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      
     children
    );
  }

  //for Public Route
  const PublicRouteNames = [
    {
      path: "/login",
      Component:<Login/>
    },
    {

      path: "/reg",
      Component: <Register/>
    },
    {
      path:'/',
      Component:<Home/>
    },
    {
      path: "/course",
      Component: <Course/>
    },
    {
      path: "/about",
      Component: <About/>
    },
    {
      path: "/contact",
      Component: <Contact/>
    },
    {
      path:'/blog',
      Component:<Blogpage/>
    },
    {
      path:'/details/:id',
      Component:<Blogdetails/>
    },
    {
      path:'/category/:id',
      Component:<CategorywithPost/>
    },
    {
      path:'/search',
      Component:<SearchData/>
    },
  
  ]
//for Private Route
  const PrivateRouteNames = [
    
     {
       path: '/form/:id',
        Component: <Courseform/>
      },
    
   ]


    useEffect(() => {
     dispatch(check_token())
   }, [])
  
  return (
    <>
      {/* <Model/> */}
  
        <Router>
          <Header/>
          <Routes>
            
            {PublicRouteNames?.map((route, index) => {
              return (
                <Route
                  Key={index + 1}
                  exact
                  path={route.path}
                  element={route?.Component}
                />
              )
            })}

            {/* Protect Route */}
             {PrivateRouteNames?.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route?.Component}</PrivateRoute>}
                />
              )

            })} 
           
          </Routes>
        </Router>

    

    </>
  );
}

export default App;
