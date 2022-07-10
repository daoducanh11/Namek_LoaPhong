import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/users`
export const LOGIN_URL = `${API_URL}/users/login`
export const REGISTER_URL = `${API_URL}/users/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/users/forgot_password`

// Server should return AuthModel
export function login(UserName: string, Password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    UserName,
    Password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  
  // return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
  //   //api_token: token,
  // })
  let headers_token= {
      'Authorization': 'Bearer ' + token
    }
  

  axios.defaults.headers.common = headers_token;


  
  var obj= axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL);
    console.log(obj);
   return obj;
}
 
