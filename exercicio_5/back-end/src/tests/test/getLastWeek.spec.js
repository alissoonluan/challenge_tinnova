let chai = require("chai");
let request = require("request");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET Vehicle", () => {
  it("Verificar veiculos registrados na ultima semana", (done) => {
    request.get(
      { url: "http://localhost:3333/find/lastweek" },
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
