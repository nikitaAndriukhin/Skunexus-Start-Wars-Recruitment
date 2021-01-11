import { css } from "@emotion/core";
import RingLoader from "react-spinners/ClipLoader";

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

export default Spinner;




