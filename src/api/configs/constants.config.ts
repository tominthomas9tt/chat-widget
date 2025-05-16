
// const BASE_URL = "https://api.stjohnstravel.co.uk/api";
const BASE_URL = "http://192.168.1.9:8080/api.chatsynk.com/api";
const SECURE_BASE_URL = BASE_URL + "/secured";
const COMMON_BASE_URL = BASE_URL + "/common";

const SECURE_BASE_URL_VERSION = (version: string) => { return BASE_URL + "/" + version + "/secured" };

export const API_CONSTANTS = {
  BASE_URL: BASE_URL,
  SECURE_BASE_URL: SECURE_BASE_URL,
  SECURE_BASE_URL_VERSION: SECURE_BASE_URL_VERSION,
  COMMON_BASE_URL: COMMON_BASE_URL,
};
