import {
  BASE_URL,
  GET_REGISTRATION_PRICE_BY_MANAGEMENTUNIT_ID,
  CHECK_IDENTIFY_CARD,
  CREATE_REGISTRATION_INTERVIEW
} from "./baseURL";

export function getRegistrationPriceByMananagementUnitId(id) {
  return fetch(
    `${BASE_URL + GET_REGISTRATION_PRICE_BY_MANAGEMENTUNIT_ID}/${id}`
  ).then(res => res.json());
}

export function checkIdentifyCard(identifyCard) {
  return fetch(`${BASE_URL + CHECK_IDENTIFY_CARD}/${identifyCard}`).then(res =>
    res.json()
  );
}

export function createRegistrationInterview(
  identifyCard,
  price,
  candidateName,
  managementUnitId,
) {
  return fetch(`${BASE_URL + CREATE_REGISTRATION_INTERVIEW}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      IdentifyCard: identifyCard,
      RegistrationPrice: price,
      CandidateName: candidateName,
      ManagementUnitId: managementUnitId
    })
  }).then(res => res.json());
}
