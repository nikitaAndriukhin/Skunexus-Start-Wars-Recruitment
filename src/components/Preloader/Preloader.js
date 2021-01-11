import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Preloader = () => {
  return (
    <div className="sweet-loading">
      <RingLoader color={'yellow'} loading={true} css={override} size={150} />
    </div>
  );
}

export default Preloader;




