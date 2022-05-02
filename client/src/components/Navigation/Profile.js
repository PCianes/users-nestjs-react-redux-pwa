import { useSelector } from "react-redux";
import { selectUser } from '../../features/auth/authSlice'
import UserImage from "./UserImage";

function Profile() {
  const { name, surname, email, image } = useSelector(selectUser)

  return (
    <div className="flex items-center px-5">
      <UserImage url={image} />
      <div className="ml-3">
        <div className="text-base font-medium leading-none text-white">{name} {surname}</div>
        <div className="text-sm font-medium leading-none text-gray-400">{email}</div>
      </div>

    </div>
  )
}

export default Profile;