import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate).getTime();

  const now = new Date().getTime();
  const duration = expirationDate - now;

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function loader() {
  return getAuthToken();
}

export function checkToken(){
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null;
}