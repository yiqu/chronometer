export class TimeData {
  constructor(public duration: number, public createDate: number, public endDate: number,
    public info?: TimeDataInformation[]) {
      this.info = [new TimeDataInformation()];
  }
}

export class TimeDataInformation {
  constructor(public note: string = "") {
  }
}

export interface TimeTableHeader {
  id: string;
  display: string;
}