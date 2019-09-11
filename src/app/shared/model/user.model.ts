export class UserInfo {
  constructor(public id: string = null,
    public firstName: string = "Guest", 
    public lastName: string = "McGee",
    public avatar?: string) {

  }
}

/**
 * User model
 */
export class User {
  constructor(public user: UserInfo = null, 
    public admin: boolean = false, 
    public isUser: boolean = false,
    public data: UserData = new UserData()) {

  }

  public setUser(u: UserInfo) {
    this.user = u;
  }

  public setNoName() {
    this.user.firstName = "Not set";
    this.user.lastName = "Not set";
  }
}

export class UserData {
  constructor(public time: UserDataTime[] = []) {
    this.time.push(new UserDataTime(0, 0));
  }
}

export class UserDataTime {
  constructor(public time: number, public data: number) {
  }
}