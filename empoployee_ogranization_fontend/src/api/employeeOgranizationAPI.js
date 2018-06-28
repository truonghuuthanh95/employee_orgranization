import {
  BASE_URL,
  GET_DISTRICT_BY_PROVINCE_ID,
  GET_PROVINCE_BY_COUNTRY_ID,
  GET_WARD_BY_DISTRICT_ID,
  GET_ALL_CANDIDATE_REGISTED_BY_MANAGEMENTUNIT_ID
} from "./baseURL";
import { duration } from "moment";

export function getProvinceByCountryId(id) {
  return fetch(`${BASE_URL + GET_PROVINCE_BY_COUNTRY_ID}/${id}`).then(res =>
    res.json()
  );
}

export function getDistrictByProvinceId(id) {
  return fetch(`${BASE_URL + GET_DISTRICT_BY_PROVINCE_ID}/${id}`).then(res =>
    res.json()
  );
}

export function getWardByDistrictId(id) {
  return fetch(`${BASE_URL + GET_WARD_BY_DISTRICT_ID}/${id}`).then(res =>
    res.json()
  );
}

export function getAllCandidateRegistedByManagementUnitId(id) {
  return fetch(
    `${BASE_URL + GET_ALL_CANDIDATE_REGISTED_BY_MANAGEMENTUNIT_ID}/${id}`
  ).then(res => res.json());
}
