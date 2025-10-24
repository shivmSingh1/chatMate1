
import './App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/Profile'
import { io } from "socket.io-client"
import { useEffect, useState } from 'react'
import { setOnlineUsers, setSocket } from './redux/slices/userSlice'
import { BACKEND_URL } from './common/baseUrl'
import useCurrentUserDetails from './customHook/useCurrentUserDetails'


function App() {
  const { userData } = useCurrentUserDetails()
  const { data } = useSelector((state) => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const isLoggedIn = Object.keys(data).length > 0;
  // const isLoggedIn = data && data._id
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // console.log("isLoggedIn", isLoggedIn)


  useEffect(() => {
    let socketIo = null;
    if (data && data?._id) {
      socketIo = io(BACKEND_URL, {
        query: {
          userId: data?._id
        }
      })
      socketIo.on("onlineUsers", (users) => {
        console.log("online", users)
        dispatch(setOnlineUsers(users))
      })

      dispatch(setSocket(socketIo))

      return () => socketIo.close()
    } else {
      socketIo?.close()
      dispatch(setSocket(null))
    }

  }, [data])

  // useEffect(() => {
  //   if (!data?._id) {
  //     navigate("/login")
  //   }
  // }, [data, navigate])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/signup' element={!data?._id ? <Signup /> : <Navigate to={"/"} />} ></Route>
        <Route path='/login' element={!data?._id ? <Login /> : <Navigate to={"/"} />} ></Route>
        <Route path='/profile' element={<Profile />} ></Route>
      </Routes>
    </>
  )
}

export default App
