import CookieHelper from "../lib/cookie";

const cookieHelper = new CookieHelper();

export default class BrochurePopup {
  private readonly emailSignupDialog: HTMLDialogElement | null;

  constructor() {
    this.emailSignupDialog = document.querySelector("#brochure-download");
    this.setup();
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
    const emailSignupCookie = cookieHelper.getCookie("brochure-signup");
    return emailSignupCookie != "";
  }

  showDialog() {
    setTimeout(() => {
      this.emailSignupDialog?.showModal();
    }, 3000)
  }

  setEmailSignupCookie() {
    cookieHelper.setCookie({
      cookieName: "brochure-signup",
      cookieValue: "true",
      expirationDays: 30
    })
  }
}