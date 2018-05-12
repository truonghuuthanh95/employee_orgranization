import { BASE_URL, CHECK_ID_AND_IDENTIFY_CARD } from "./baseURL";

export function checkIsValidToUpdateRegistrationInterview(id, identifyCard) {
  return fetch(
    `${BASE_URL + CHECK_ID_AND_IDENTIFY_CARD}/${id}/${identifyCard}`
  ).then(res => res.json());
}
