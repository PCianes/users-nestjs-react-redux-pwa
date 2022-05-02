import { useNavigate } from "react-router-dom"; // v6
import { Disclosure } from '@headlessui/react'
import PropTypes from 'prop-types'
function MobileMenu({ navigation, currentPath }) {
  const navigate = useNavigate();
  const getClasses = (to) => currentPath === to
    ? 'bg-gray-900 text-white'
    : 'text-gray-300 hover:bg-gray-700 hover:text-white'

  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {navigation.map(({ name, to }) => (
        <Disclosure.Button
          key={name}
          as="a"
          onClick={() => navigate(to)}
          className={`${getClasses(to)} block px-3 py-2 rounded-md text-base font-medium`}
          aria-current={currentPath === to ? 'page' : undefined}
        >
          {name}
        </Disclosure.Button>
      ))}
    </div>
  )
}

MobileMenu.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
  })),
  currentPath: PropTypes.string.isRequired
};

export default MobileMenu;