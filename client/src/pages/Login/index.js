import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/Containers/FormContainer';
import FormButton from '../../components/FormButton'
import FormInput from '../../components/FormInput'
import { signInUser } from '../../features/auth/authSlice'
import Alert from '../../components/Alerts';
import Loading from '../../components/Loading.js'
import useLogged from '../../hooks/useLogged'

function Login() {
  const dispatch = useDispatch();
  const { isLogged, loading, user, errors } = useSelector(state => state.auth)

  //custom hook to redirect after login
  useLogged()

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    dispatch(signInUser(email, password))
  }

  const getErrors = () => {
    if (Array.isArray(errors)) {
      return errors.map(error => <Alert key={error} message={error} error={true} />)
    }

    //Not show error about 'Unauthorized' on login page
    //because of get user on first render (see App.js)
    if (errors === 'Unauthorized') return null;

    return <Alert message={errors} error={true} />;
  }

  return (
    <FormContainer title="Login">
      {loading && <Loading />}
      {errors && getErrors()}
      {isLogged && user && <Alert message={`Welcome ${user.name} ${user.surname}!`} />}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <FormInput label="Email address" type="email" name="email" inputRef={emailRef} />
          <FormInput label="Password" type="password" name="password" inputRef={passwordRef} />
        </div>
        <div className="flex justify-end">
          <div className="text-sm">
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Don't have an account yet?
            </Link>
          </div>
        </div>
        <div>
          <FormButton text="Log In" />
        </div>
      </form>
    </FormContainer>
  )
}

export default Login;