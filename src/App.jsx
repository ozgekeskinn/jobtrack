import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router";

import './App.css';
import MainLayout from "./layouts/MainLayout";

import Home from './pages/Home/Home.jsx' ;
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Applications from "./pages/Applications/Applications.jsx";
import AddApplication from "./pages/AddApplication/AddApplication.jsx";
import ApplicationDetail from "./pages/ApplicationDetail/ApplicationDetail.jsx";
import Statistics from "./pages/Statistics/Statistics.jsx";
import Kanban from "./pages/Kanban/Kanban.jsx";
import EditApplication from "./pages/EditApplication/EditApplication.jsx";

const router = createBrowserRouter([
  {
    path : "/",
    element : <MainLayout />,
    
    children : [
      {
        index : true,
        element : <Home />,
      },

      {
        path : "dashboard",
        element : <Dashboard />,
      },

      {
        path : "applications",
        element : <Applications />,
      },

      {
        path : "applications/add",
        element : <AddApplication />,
      },

      {
        path: "kanban",
        element: <Kanban />,
      },

      {
        path: "applications/:id/edit",
        element: <EditApplication />,
      },
      
      {
        path : "applications/:id",
        element : <ApplicationDetail />,
      },

      {
        path : "statistics",
        element : <Statistics />,
      },
    ],    
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}
