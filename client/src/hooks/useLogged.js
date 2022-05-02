import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogged = () => {
  const { isLogged } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    isLogged && setTimeout(() => navigate("/users"), 2000);
  }, [isLogged, navigate]);
};

export default useLogged;
