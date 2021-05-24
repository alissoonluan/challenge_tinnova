let chai = require("chai");
let request = require("request");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET Vehicle", () => {
  it("Verificar veiculos por fabricante", (done) => {
    request.get(
      { url: "http://localhost:3333/find/manufacturer/toyota" },
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
