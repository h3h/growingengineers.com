import assert = require("assert");
import { describe } from "mocha";
import { Importer } from "../src/importer";
import * as fs from "fs";

describe("Importer", function () {
  it("gives a result", function () {
    let importer = new Importer(
      fs.readFileSync(__dirname + "/../data/import.yaml").toString()
    );
    assert.strict(importer.parse());
  });
});
