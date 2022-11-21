import React from 'react'
import curve from "../src/assets/images/spinner/Curve-Loading.gif"
import loop from '../src/assets/images/spinner/loop_pingpong.gif';
import loading from '../src/assets/images/spinner/loading.gif';

const Loader = () => {
    var loaderStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100px",
        height: "auto",
        textAlign: "center",
        }
  return (
    <div style={loaderStyle}>
    <img style={{ maxWidth: "100%", height: "auto" }} src={loading} width="90px" height="auto" alt="loader" />
  </div>
  )
}

export default Loader