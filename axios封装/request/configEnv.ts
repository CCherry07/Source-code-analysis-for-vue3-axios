let BASE_URL = "/api";
let TIME_OUT = 5000;
if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
  TIME_OUT = 5000;
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "/api";
  TIME_OUT = 5000;
} else {
  BASE_URL = "/api";
  TIME_OUT = 5000;
}
export { BASE_URL, TIME_OUT };
