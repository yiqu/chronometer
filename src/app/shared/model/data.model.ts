export class TimeData {
  constructor(public duration: number, public createDate: number, public endDate: number,
    public info: TimeDataInformation[]) {
  }
}

export class TimeDataInformation {
  constructor(public note: string = "") {
  }
}