import { useDispatch, useSelector } from "react-redux"
import authService from "../../Appwrite/auth"
import { logout } from "../../Store/authSlice"
import { hideLoader, showLoader } from "../../Store/loaderSlice"
import { Loader } from "../index"
import { useNavigate } from "react-router-dom"

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const loading = useSelector((state) => state.loader.loading)
    const logouthandler = () => {
        dispatch(showLoader())
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
            .catch((error) => console.log("Something went wrong : ", error))
            .finally(() => {
                navigate('/');
                dispatch(hideLoader())
            })
    }
    return (
        <>
            {loading && <Loader />}
            <button className="px-6 py-2 duration-200 bg-red-400 hover:bg-red-400/50 rounded-md mt-auto w-full" onClick={logouthandler}>Logout</button>
        </>
    )
}

export default LogoutBtn