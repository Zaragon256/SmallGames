import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  NavLink,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Maze from './pages/maze/Maze.jsx'
import './index.css'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "maze/:mazeSeed",
//     element: <Maze favcol="yellow4"/>,
//     errorElement: <ErrorPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
