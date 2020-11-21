let BASE_URL = "http://localhost:5000/";

if (process.env.REACT_APP_ENV === "production") {
  BASE_URL = "https://glacial-oasis-04139.herokuapp.com/";
}

export { BASE_URL };
