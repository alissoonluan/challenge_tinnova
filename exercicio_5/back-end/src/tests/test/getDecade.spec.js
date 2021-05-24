let chai = require("chai");
const env = require("../../database/config/env/env");
let request = require("request");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET Vehicle", () => {
  it("Verificar todos veiculos por decada", (done) => {
    request.get(
      { url: "http://localhost:3333/find/decade/2000/2020" },
      function (error, response, body) {
        var _body = {};
        try {
          _body = JSON.parse(body);
        } catch (e) {
          _body = {};
        }

        expect(response.statusCode).to.equal(200);

        done();
      }
    );
  });
});
