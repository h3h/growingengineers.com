class Importer {
  data: string;
  onerror: (errors: Array<string>) => void;

  constructor(data: string) {
    this.data = data;
  }

  parse(): boolean {
    return false;
  }
}
