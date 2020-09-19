'use strict';

class UserInfo {
  constructor(nameElement, jobElement, avatarElement) {
    this.nameElement = nameElement;
    this.jobElement = jobElement;
    this.avatarElement = avatarElement;
    this.setUserInfo(
      this.nameElement.textContent,
      this.jobElement.textContent,
      this.avatarElement
    );
  }

  setUserInfo(name, job, avatar) {
    this.name = name;
    this.job = job;
    this.avatar = avatar;
  }

  updateUserInfo() {
    this.nameElement.textContent = this.name;
    this.jobElement.textContent = this.job;
    this.avatarElement.style.backgroundImage = `url(${this.avatar})`;
  }
}
