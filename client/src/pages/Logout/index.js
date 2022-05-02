import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"; // v6
import FormContainer from '../../components/Containers/FormContainer';
import Button from '../../components/Button'
import { logOutUser } from '../../features/auth/authSlice'
import Loading from '../../components/Loading.js'

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, loading, user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logOutUser())
    handleGoHome()
  }

  const handleGoHome = () => {
    navigate('/')
  }

  if (!isLogged) {
    handleGoHome()
    return null;
  }

  return (
    <FormContainer title={`Hi ${user.name}! Are you sure you want to log out?`}>
      {loading && <Loading />}
      <Button text="Log Out Now!" onClick={handleLogout} />
      <Button text="Go Home" onClick={handleGoHome} />
    </FormContainer>
  )
}

export default Logout;