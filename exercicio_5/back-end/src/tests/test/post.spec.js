let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/POST Vehicle", () => {
  it("Verificar o cadastro de veículo", (done) => {
    let vehicle = {
      vehicle: "Celta",
      brand: "Toyota",
      year: 2000,
      description: "Preto gasolina 1.0",
      sold: true,
    };
    chai
      .request("http://localhost:3333")
      .post("/")
      .send(vehicle)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
