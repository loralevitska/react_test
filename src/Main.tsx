import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './layouts/contact/Contact';
import Home from './layouts/home/Home';
import About from './layouts/about/About';
import SignUp from './layouts/components/SignUp';
import { SignIn } from './layouts/components/SignIn';
import Feeds from './layouts/feeds/Feeds';

function Main() {
  return (
    <div>
      <div className="content">

        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/contact" Component={Contact} />
            <Route path="/about" Component={About} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/signin" Component={SignIn} />
            <Route path="/feeds" Component={Feeds} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default Main;
