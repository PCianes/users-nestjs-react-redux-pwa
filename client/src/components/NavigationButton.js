import { Link } from 'react-router-dom';
import Button from './Button';

function NavigationButton({ text, to }) {
  return (
    <Link to={to}>
      <Button text={text} />
    </Link>
  )
}

export default NavigationButton;