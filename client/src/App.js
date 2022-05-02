import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Routes from './pages/Routes'
import { fetchUser } from './features/auth/authSlice'

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const renderTitle = () => {
    const title = pathname.charAt(1).toUpperCase() + pathname.slice(2)
    return pathname === '/' ? 'Login' : title
  }

  //Get user on first render with token save on localstorage
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);

  return (
    <>
      <div className="min-h-full">
        <Navigation />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">{renderTitle()}</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Routes />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App;
