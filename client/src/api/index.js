import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' ? 'https://guarded-dawn-74018.herokuapp.com' : 'http://localhost:3000'

export const authOptions = () => {
  const options = {
    headers: {
      'content-type': 'application/json'
    }
  }

  const token = window.localStorage.getItem('token');

  if (!token) {
    return options
  }

  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  }
}

export const request = async (fn) => {
  let error;
  let response;

  try {
    response = await fn()
  } catch (e) {
    error = e
  }

  return {
    error: error?.response?.data,
    data: response?.data
  }
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json'
  },
});

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise(resolve => {
      resolve(response);
    }),
  (error) => {
    return new Promise((_resolve, reject) => {
      reject(error);
    });
  }
);

export default axiosInstance;
