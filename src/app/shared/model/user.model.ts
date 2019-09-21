import { TimeDataInformation, TimeData } from './data.model';

/**
 * User model
 */
export class User {
  constructor(
    public user: UserInfo = null, 
    public admin: boolean = false, 
    public isUser: boolean = false,
    public data: UserData = new UserData(),
    public hashKey: string = null) {

  }

  public setUser(u: UserInfo) {
    this.user = u;
  }

  public setNoName() {
    this.user.firstName = "Not set";
    this.user.lastName = "Not set";
  }

  public isUserSet() {
    return this.user.id ? true : false;
  }
}

export class UserInfo {
  constructor(public id: string = null,
    public firstName: string = "Guest", 
    public lastName: string = "McGee",
    public avatar?: string) {
  }
}

export class UserData {
  constructor(public time: TimeData[] = []) {
    let infos: TimeDataInformation[] = [];
    let info = new TimeDataInformation("Empty");
    infos.push(info);
    this.time.push(new TimeData(0, 0, 0, null, infos));
  }

  setTime(data: TimeData[]) {
    this.time = data;
  }
}