let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/DELETE Vehicle", () => {
  it("Verificar a remoção do veículo", (done) => {
    chai
      .request("http://localhost:3333")
      .delete("/14")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
