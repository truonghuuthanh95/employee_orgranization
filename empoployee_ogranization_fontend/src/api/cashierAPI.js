import {
  BASE_URL,
  GET_REGISTRATION_PRICE_BY_MANAGEMENTUNIT_ID,
  CHECK_IDENTIFY_CARD,
  CREATE_REGISTRATION_INTERVIEW,
  GET_MANAGEMENT_UNIT_BY_ID
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
  accountId
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
      ManagementUnitId: managementUnitId,
      CreatedBy: accountId
    })
  }).then(res => res.json());
}

export function getManagementUnitById(id) {
  return fetch(`${BASE_URL + GET_MANAGEMENT_UNIT_BY_ID}/${id}`).then(res =>
    res.json()
  );
}
