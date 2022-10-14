import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

interface Props{
    children : React.ReactNode
}
function ProtectedRoutes({children}: Props) {
    const user = useContext(AuthContext)
    if(!user){
        return <Navigate to='/' />
    }else{
        return (
          <>{children}</>
        )
    }
}

export default ProtectedRoutes