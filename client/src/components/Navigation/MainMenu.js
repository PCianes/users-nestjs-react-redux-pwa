import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

function MainMenu({ navigation, currentPath }) {
  const getClasses = (to) => currentPath === to
    ? 'bg-gray-900 text-white'
    : 'text-gray-300 hover:bg-gray-700 hover:text-white'

  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <img
          className="h-8 w-8"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          alt="Workflow"
        />
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {navigation.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              className={`${getClasses(to)} px-3 py-2 rounded-md text-sm font-medium`}
              aria-current={currentPath === to ? 'page' : undefined}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

MainMenu.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
  })),
  currentPath: PropTypes.string.isRequired
};

export default MainMenu;