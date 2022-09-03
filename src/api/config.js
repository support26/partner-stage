import axios from "axios";
import cookies from "js-cookie";

// for live testing
//export const mainUrl = `https://still-depths-36066.herokuapp.com`;

// local testing
// export const mainUrl = `http://localhost:8001`;
export const mainUrl = `https://android-mapping-backend.el.r.appspot.com`;
const baseDomain = `${mainUrl}/`;


// const baseDomain = 'http://127.0.0.1:8001/'; // API for products


function getToken() {
    const userID = cookies.get('token');
    if (userID) {
        return (userID);
    } else {
        return null;
    }
}

var token = getToken();

export const customHeaders = {
    "Content-Type": "application/json",
    'Accept': "application/json",
    "Access-Control-Allow-Origin": "*",
    'access-control-allow-headers': 'Origin, X-Requested-With, content type, Authorization, Accept'
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});