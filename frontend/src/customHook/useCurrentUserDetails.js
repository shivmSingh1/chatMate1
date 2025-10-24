import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { GET } from "../../axios/axios.request";
import { setUserData } from "../redux/slices/userSlice";

const useCurrentUserDetails = () => {
	const { data } = useSelector((state) => state.User)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await GET("/api/user/getCurrentUser");
				if (res.status === 200) {
					console.log("res", res);
					dispatch(setUserData(res?.data?.data));
				}
			} catch (error) {
				console.log("error in getting user details", error.message);
			}
		};
		fetchUser();
	}, [dispatch]);

	return { userData: data }
}

export default useCurrentUserDetails;