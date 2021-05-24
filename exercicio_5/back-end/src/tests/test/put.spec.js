let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/PUT Vehicle", () => {
  it("Verificar o cadastro de veículo", (done) => {
    let vehicle = {
      vehicle: "Monza",
      brand: "Hyundai",
      year: 2010,
      description: "Prata 2.0",
      sold: true,
    };
    chai
      .request("http://localhost:3333")
      .put("/12")
      .send(vehicle)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
