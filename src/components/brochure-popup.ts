import CookieHelper from "../lib/cookie";

const cookieHelper = new CookieHelper();

export default class BrochurePopup {
  private readonly emailSignupDialog: HTMLDialogElement | null;
  private readonly emailSignupBackdrop: HTMLDivElement | null;
  private readonly emailSignupCloseForm: HTMLFormElement | null | undefined;

  constructor() {
    this.emailSignupDialog = document.querySelector("#brochure-download");
    this.emailSignupBackdrop = document.querySelector(".email-signup_backdrop");
    this.emailSignupCloseForm = this.emailSignupDialog?.querySelector(
      "form[method='dialog']"
    );
  }

  setup() {
    if (this.emailSignupDialog == null) return;

    const cookieSet = this.checkForCookie();
    if (cookieSet) return;
    this.showDialog();
    this.setEmailSignupCookie();

    if (this.emailSignupCloseForm) {
      this.emailSignupCloseForm.addEventListener("submit", (e) => {
        this.handleDialogClose();
      });
    }
  }

  checkForCookie() {
    const emailSignupCookie = cookieHelper.getCookie("brochure-shown");
    return emailSignupCookie != "";
  }

  showDialog() {
    setTimeout(() => {
      if (!this.emailSignupBackdrop || !this.emailSignupDialog) return;
      this.emailSignupDialog.show();
      this.emailSignupDialog.querySelector("button")?.focus();
      this.emailSignupBackdrop.style.display = "block";
    }, 3000);
  }

  handleDialogClose() {
    if (!this.emailSignupBackdrop) return;
    this.emailSignupBackdrop.style.display = "none";
  }

  setEmailSignupCookie() {
    cookieHelper.setCookie({
      cookieName: "brochure-shown",
      cookieValue: "true",
      expirationDays: 30,
    });
  }
}
