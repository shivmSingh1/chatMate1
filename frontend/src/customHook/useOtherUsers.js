import { useDispatch, useSelector } from "react-redux"
import { GET } from "../../axios/axios.request"
import { setAllOtherUsers } from "../redux/slices/userSlice"
import { useEffect } from "react"


const useOtherUsers = () => {
	const { otherUsers } = useSelector((state) => state.User)
	const dispatch = useDispatch()
	const fetchAllOtherUsers = async () => {
		try {
			const res = await GET("/api/user/getAllOtherUsers")
			if (res.status === 200) {
				console.log("all users fetched")
				dispatch(setAllOtherUsers(res?.data?.data))
			}
		} catch (error) {
			console.log('error in fetching all other users', error.message)
		}
	}

	useEffect(() => {
		fetchAllOtherUsers()
	}, [dispatch])

	return otherUsers
}

export default useOtherUsers