import {
  BASE_URL,
  CHECK_ID_AND_IDENTIFY_CARD,
  GET_DISTRICT_BY_PROVINCE_ID,
  GET_PROVINCE_BY_COUNTRY_ID,
  GET_WARD_BY_DISTRICT_ID,
  GET_ALL_DEGREE_CLASSFICATION,
  GET_ALL_HIGHTEST_EDUCATION,
  GET_ALL_SUBJECT,
  GET_ALL_TRAINNING_CATERGORY,
  GET_ALL_SPECIALIZEZ_TRAINING,
  GET_ALL_INFOMATION_TECHNOLOGY,
  GET_ALL_GRADUATIONCLASSFICATION,
  GET_ALL_FOREIGN_LANGUAGE_SPECTIFICATION,
  GET_ALL_STATUS_WORKING_ON_EDUCATION,
  GET_SCHOOL_DEGREE
} from "./baseURL";

export function checkIsValidToUpdateRegistrationInterview(id, identifyCard) {
  return fetch(
    `${BASE_URL + CHECK_ID_AND_IDENTIFY_CARD}/${id}/${identifyCard}`
  ).then(res => res.json());
}

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
export function getAllTranningCaterory() {
  return fetch(BASE_URL + GET_ALL_TRAINNING_CATERGORY).then(res => res.json());
}
export function getAllHightestEducation() {
  return fetch(BASE_URL + GET_ALL_HIGHTEST_EDUCATION).then(res => res.json());
}
export function getAllSubject() {
  return fetch(BASE_URL + GET_ALL_SUBJECT).then(res => res.json());
}
export function getAllDegreeClassfication() {
  return fetch(BASE_URL + GET_ALL_DEGREE_CLASSFICATION).then(res => res.json());
}

export function getAllSpecializedTraining() {
  return fetch(BASE_URL + GET_ALL_SPECIALIZEZ_TRAINING).then(res => res.json());
}
export function getAllInfomaionTechnology() {
  return fetch(BASE_URL + GET_ALL_INFOMATION_TECHNOLOGY).then(res =>
    res.json()
  );
}
export function getAllGraduationClassfication() {
  return fetch(BASE_URL + GET_ALL_GRADUATIONCLASSFICATION).then(res =>
    res.json()
  );
}

export function getAllForeignLanguageClassfication() {
  return fetch(BASE_URL + GET_ALL_FOREIGN_LANGUAGE_SPECTIFICATION).then(res =>
    res.json()
  );
}
export function getAllStatusWorkingInEducation() {
  return fetch(BASE_URL + GET_ALL_STATUS_WORKING_ON_EDUCATION).then(res =>
    res.json()
  );
}
export function getSchoolDegree(){
  return fetch(BASE_URL + GET_SCHOOL_DEGREE).then(res => res.json());
}
