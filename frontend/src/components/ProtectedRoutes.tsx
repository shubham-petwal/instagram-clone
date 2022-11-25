import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
function ProtectedRoutes({ children }: Props) {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  if (!user) {
    return (
        // timeout until user check is completed, stops opening login component on reload
      <>
        {setTimeout(() => {
          navigate("/");
        },1000)}
      </>
    );
  } else {
    return <>{children}</>;
  }
}

export default ProtectedRoutes;
