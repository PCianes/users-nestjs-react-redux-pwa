import { Disclosure } from '@headlessui/react'
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import MainMenu from './MainMenu';
import Profile from './Profile';
import MobileMenu from './MobileMenu';
import MobileButton from './MobileButton';
import UserImage from './UserImage';

const navigationLogged = [
  { name: 'Logout', to: '/logout' },
  { name: 'Users', to: '/users' },
]

const navigationNotLogged = [
  { name: 'Login', to: '/' },
  { name: 'SignUp', to: '/signup' },
]

function Navigation() {
  const { pathname } = useLocation();
  const { isLogged, user } = useSelector(state => state.auth)

  const navigation = isLogged ? navigationLogged : navigationNotLogged;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <MainMenu navigation={navigation} currentPath={pathname} />
              {
                isLogged && (
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <div className="ml-3 relative">
                        <UserImage url={user.image} />
                      </div>
                    </div>
                  </div>
                )
              }
              <MobileButton open={open} />
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <MobileMenu navigation={navigation} currentPath={pathname} />
            <div className="pt-4 pb-3 border-t border-gray-700">
              {isLogged && <Profile />}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navigation;