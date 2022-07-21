import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
