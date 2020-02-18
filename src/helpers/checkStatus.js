/* eslint-disable no-console */
export default function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  console.log(` Failute fetch: ${res.statusText}`);
  const error = new Error(res.statusText);
  error.res = res;
  throw error;
}
