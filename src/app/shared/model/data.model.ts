export class TimeData {
  constructor(public duration: number, public createDate: number, public endDate: number,
    public hashKey: string, public info?: TimeDataInformation[]) {
      if (!duration) {
        this.duration = 0;
      }
      if (!createDate) {
        this.createDate = 0;
      }
      if (!endDate) {
        this.endDate = 0;
      }
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