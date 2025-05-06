import CookieHelper from "../lib/cookie";

const cookieHelper = new CookieHelper();

export default class BrochurePopup {
  private readonly emailSignupDialog: HTMLDialogElement | null;

  constructor() {
    this.emailSignupDialog = document.querySelector("#brochure-download");
  }

  setup() {
    console.log(this.emailSignupDialog);
    if(this.emailSignupDialog == null) return;

    const cookieSet = this.checkForCookie();
    if(cookieSet) return;
    this.showDialog();
    this.setEmailSignupCookie();
  }

  checkForCookie() {
    const emailSignupCookie = cookieHelper.getCookie("brochure-shown");
    return emailSignupCookie != "";
  }

  showDialog() {
    setTimeout(() => {
      this.emailSignupDialog?.showModal();
    }, 3000)
  }

  setEmailSignupCookie() {
    cookieHelper.setCookie({
      cookieName: "brochure-shown",
      cookieValue: "true",
      expirationDays: 30
    })
  }
}