import * as YAML from "js-yaml"

interface ConfigAttributeDetail {
  attribute: string
  min?: number
  max?: number
}
interface ConfigAttributes {
  [role: string]: {
    [dimension: string]: Array<ConfigAttributeDetail>
  }
}
export interface ValidConfig {
  v: number
  roles: Array<string>
  levels: Map<string, Map<number, string>>
  attributes: ConfigAttributes
}

export class Importer {
  config: ValidConfig
  data: string
  onerror: (errors: Error[]) => void

  constructor(data: string) {
    this.data = data
  }

  parse(): boolean {
    try {
      let parsed = YAML.load(this.data) as ValidConfig
      let errors = this.validateDocument(parsed)
      if (0 === errors.length) {
        this.config = parsed
        return true
      } else {
        typeof this?.onerror === "function" && this.onerror(errors)
      }
    } catch (e) {
      typeof this?.onerror === "function" && this.onerror([e])
    }
    return false
  }

  validateDocument(doc: ValidConfig): Error[] {
    let errors: Error[] = []

    if (!("number" === typeof doc.v)) {
      errors.push(new Error("Missing property 'v', a numerical version number"))
    }

    if (!(Array.isArray(doc.roles) && "string" === typeof doc.roles[0])) {
      errors.push(new Error("Missing property 'roles', an array of strings"))
    }

    if (!(doc.hasOwnProperty("levels") && doc.levels)) {
      errors.push(
        new Error(
          "Missing property 'levels', a map of string _roles_, each to a map " +
            "of number _level_ to string _title_"
        )
      )
    }

    return errors
  }
}
