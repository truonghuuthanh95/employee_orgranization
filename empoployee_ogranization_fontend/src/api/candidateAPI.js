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
  GET_SCHOOL_DEGREE,
  UPDATE_REGISTRATION_INTERVIEW
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
export function getSchoolDegree() {
  return fetch(BASE_URL + GET_SCHOOL_DEGREE).then(res => res.json());
}
export function updateRegistrationInterview(
  registrationInterview,
  paramDOB,
  currentLivingAddress,
  houseHold
) {
  return fetch(BASE_URL + UPDATE_REGISTRATION_INTERVIEW, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      Id: registrationInterview.Id,
      CandidateFirstName: registrationInterview.CandidateFirstName,
      CandidateLastName: registrationInterview.CandidateLastName,
      DOB: paramDOB,
      CreatedAtManagementUnitId:
        registrationInterview.CreatedAtManagementUnitId,
      PhoneNumber: registrationInterview.PhoneNumber,
      Aspirations01DistrictId: registrationInterview.Aspirations01DistrictId,
      Aspirations02DistrictId: registrationInterview.Aspirations02DistrictId,
      Aspirations03DistrictId: registrationInterview.Aspirations03DistrictId,
      Email: registrationInterview.Email,
      SubjectToInterviewId: registrationInterview.SubjectToInterviewId,
      ForeignLanguageDegreeId: registrationInterview.ForeignLanguageDegreeId,
      InfomationTechnologyDegreeId:
        registrationInterview.InfomationTechnologyDegreeId,
      IsMale: registrationInterview.IsMale,
      DegreeClassificationId: registrationInterview.DegreeClassificationId,
      GraduatedAtYear: registrationInterview.GraduatedAtYear,
      CurrentLivingAddressId: currentLivingAddress.Ward.Id,
      HouseHoldId: houseHold.Ward.Id,
      SchoolDegreeIdExpectedTeach:
        registrationInterview.SchoolDegreeIdExpectedTeach,
      SpecializedTranningId: registrationInterview.SpecializedTranningId,
      IsNienChe: registrationInterview.IsNienChe,
      GPA: registrationInterview.GPA,
      CaptionProjectPoint: registrationInterview.CaptionProjectPoint,
      TrainningCatergoryId: registrationInterview.TrainningCatergoryId,
      HighestLevelEducationId: registrationInterview.HighestLevelEducationId,

      UniversityLocation: registrationInterview.UniversityLocation,
      UniversityName: registrationInterview.UniversityName,
      GraduationClassficationId:
        registrationInterview.GraduationClassficationId,
      IsHadNghiepVuSupham: registrationInterview.IsHadNghiepVuSupham,
      StatusWorkingInEducationId:
        registrationInterview.StatusWorkingInEducationId,
      CurrentLivingAddressHouseNumber: currentLivingAddress.HouseNumber,
      HouseHoldHouseNumber: houseHold.HouseNumber,
      NamVaoNghanh: registrationInterview.NamVaoNghanh,
      MaNgach: registrationInterview.MaNgach,
      HeSoLuong: registrationInterview.HeSoLuong,
      MocNangLuongLansau: registrationInterview.MocNangLuongLansau,
    })
  }).then(res => res.json());
}
