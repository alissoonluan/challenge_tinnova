let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/PATCH Vehicle", () => {
  it("Verificar se teve atualização parcial", (done) => {
    let vehicle = {
      description: "Branco 1.0 alcool",
    };
    chai
      .request("http://localhost:3333")
      .patch("/13")
      .send(vehicle)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
