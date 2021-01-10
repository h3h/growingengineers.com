import * as YAML from "yaml";

type ConfigRoles = Array<string>;
type ConfigLevels = Map<string, Map<number, string>>;
interface ConfigAttributeDetail {
  attribute: string;
  min?: number;
  max?: number;
}
interface ConfigAttributes {
  [role: string]: {
    [dimension: string]: Array<ConfigAttributeDetail>;
  };
}
interface ValidConfig {
  roles: ConfigRoles;
  levels: ConfigLevels;
  attributes: ConfigAttributes;
}

export class Importer {
  config: Map<string, string>;
  data: string;
  onerror: (errors: Array<string>) => void;

  constructor(data: string) {
    this.data = data;
  }

  parse(): boolean {
    let parsedConfig: ValidConfig = YAML.parse(this.data);
    console.log(parsedConfig);
    return true;
  }
}
