import { LOG_IN } from "./baseURL";

export function requestLogin(username, password) {
  const data =
    "username=" + username + "&password=" + password + "&grant_type=password";
  return fetch(LOG_IN, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: data
  }).then(res => res.json());
}
