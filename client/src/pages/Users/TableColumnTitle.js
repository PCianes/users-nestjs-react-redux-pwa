import PropTypes from 'prop-types'

function TableColumnTitle({ text }) {
  return (
    <th
      className="px-5 py-3 border-b-2 bg-indigo-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
      {text}
    </th>
  )
}

TableColumnTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TableColumnTitle