import axios from "axios";

async function login(username, password) {
  return axios.post(
    "https://run.mocky.io/v3/3669c83a-9ba1-4424-b08f-a8ef6d699966", 
    {
      username,
      password,
    }
  );
}

export { login };
