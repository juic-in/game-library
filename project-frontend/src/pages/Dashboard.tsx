import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);



  return <div>Dashboard</div>;
};

export default Dashboard;
