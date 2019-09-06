export class UserInfo {
  constructor(public id: string = null,
    public firstName: string = "Guest", 
    public lastName: string = "McGee") {

  }
}

export class User {
  constructor(public user: UserInfo = null, 
    public admin: boolean = false, 
    public isUser: boolean = false) {

  }

  public setUser(u: UserInfo) {
    this.user = u;
  }

  public setNoName() {
    this.user.firstName = "Not set";
    this.user.lastName = "Not set";
  }
}