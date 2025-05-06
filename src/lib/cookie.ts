type cookieName = string;
type cookieValue = string;
type expirationDays = number;

export default class CookieHelper {
  constructor() {
  }

  setCookie({cookieName, cookieValue, expirationDays}: {
    cookieName: cookieName,
    cookieValue: cookieValue,
    expirationDays: expirationDays
  }) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }

  getCookie(cookieName: cookieName) {
    let name = cookieName + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }
}