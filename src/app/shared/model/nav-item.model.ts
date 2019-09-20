export class NavItem {
  constructor(public display: string, public url: string, public disabled: boolean = false) {
  }
}

export class RouterDataConfig {
  links: string[];
  params: any;
  handling: string;

  constructor(links: string[], params: any, handling: string) {
  }
}