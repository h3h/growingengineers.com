import { describe } from "mocha"
import { expect } from "chai"
import { Importer } from "../src/importer"
import { readFileSync } from "fs"
import * as sinon from "sinon"

describe("Importer", function () {
  var invalidData: string = "banana town"
  var validData: string
  var importer: Importer

  describe("with a valid config", function () {
    before(function () {
      validData = readFileSync(__dirname + "/../data/import.yaml").toString()
    })

    it("#parse returns true", function () {
      importer = new Importer(validData)
      expect(importer.parse()).to.be.true
    })
  })

  describe("with an invalid config", function () {
    it("#parse returns false", function () {
      importer = new Importer(invalidData)
      expect(importer.parse()).to.be.false
    })

    it("calls its onerror function and passes an array of Errors", function () {
      importer = new Importer(invalidData)
      importer.onerror = sinon.spy()
      importer.parse()
      // @ts-ignore: spy methods confuse the param types
      expect(importer.onerror.getCall(0).args[0][0]).to.be.an("Error")
    })
  })
})
