import PropTypes from 'prop-types';

import { css } from "@emotion/core";
import RingLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <RingLoader color={'yellow'} loading={true} css={override} size={150} />
    </div>
  );
}
Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;

// function Spinner({ className }) {
//   return (
//     <div className={clsx('lds-ellipsis', className)}>
//       <div />
//       <div />
//       <div />
//       <div />
//     </div>
//   );
// }




