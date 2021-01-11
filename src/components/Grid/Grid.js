import PropTypes from 'prop-types';
import './Grid.css';

function Grid({ data: { header = [], values = [], actions = [] } }) {
  return (
    <table className="gridTable">
      <thead>
        <tr>
          {header.map(({ columnName, type = 'text' }) => (
            <th key={columnName}>
              {columnName}
              <span className="gridTable-header-type">{type}</span>
            </th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index}>
            {header.map(({ columnName, type, Cell }) => (
              <td key={columnName} style={type === 'number' ? { textAlign: 'center' } : null}>
                {typeof Cell === 'function' ? <Cell row={row} /> : row[columnName]}
              </td>
            ))}
            {!!actions.length && (
              <td className="gridActions">
                {actions.map(({ label, action, isOpen = true }, index) => {
                  const isShowing = typeof isOpen === 'function' ? !!isOpen(row) : !!isOpen;
                  return (
                    isShowing && (
                      <button key={index} onClick={() => action(row)}>
                        <p>{label}</p>
                      </button>
                    )
                  );
                })}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Grid.propTypes = {
  data: PropTypes.exact({
    header: PropTypes.arrayOf(
      PropTypes.shape({
        columnName: PropTypes.string,
        type: PropTypes.oneOf(['text', 'number']),
        Cell: PropTypes.func,
      })
    ),
    values: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
        isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      })
    ),
  }),
};

export default Grid;
