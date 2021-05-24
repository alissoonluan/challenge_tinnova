const { vehicle } = require("../models/vehicle");
//const axios = require("axios");
const { Op } = require("sequelize");

// async function validateBrand(brand) {
//   const urlValidateBrand =
//     "https://fipeapi.appspot.com/api/1/carros/marcas.json";

//   const response = await axios.get(urlValidateBrand);
//   const brands = response.data;

//   const brandExists = brands.find((item) => item.name === brand.toUpperCase());

//   console.log(brands.name);

//   if (!brandExists)
//     throw new Error(
//       "A marca informada é inválida, por favor verifique e tente novamente!"
//     );
// }

async function validateRequiredData(vehicleReq) {
  const { vehicle, brand, year, description, sold } = vehicleReq;

  if (!vehicle) throw new Error("Por favor, informe o Veículo!");
  if (!brand) throw new Error("Por favor, Informe a Marca do Veículo!");
  //await validateBrand(brand);
  if (!year) throw new Error("Por favor, informe o ano!");

  const currentYear = new Date().getFullYear();
  if (year < 1700 || year > new Date().getFullYear())
    throw new Error(
      `Ano inválido, o valor deve estar entre 1700 e ${currentYear}`
    );

  if (!description)
    throw new Error("Por favor, informe a descrição do Veículo!");
  if (sold === undefined || sold === null)
    throw new Error("Por favor, informe o ano do Veículo");
}

const findByNotSold = async (req, res) => {
  try {
    const result = await vehicle.findAndCountAll({
      where: { sold: false },
    });

    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const findByDecade = async (req, res) => {
  try {
    const result = await vehicle.findAll({
      where: {
        year: {
          [Op.between]: [req.params.from, req.params.to],
        },
      },
    });

    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const findByManufacturer = async (req, res) => {
  try {
    const result = await vehicle.findAll({
      where: {
        brand: req.params.manufacturer,
      },
    });
    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const findByLastWeek = async (req, res) => {
  try {
    const dateNow = new Date();
    const result = await vehicle.findAll({
      where: {
        createdAt: {
          [Op.between]: [dateNow.setDate(dateNow.getDate() - 7), new Date()],
        },
      },
    });
    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    const result = await vehicle.findAll();
    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await vehicle.findByPk(id);
    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const create = async (vehicleReq, res) => {
  try {
    const vehicleBody = vehicleReq.body;
    await validateRequiredData(vehicleBody);
    vehicleBody.sold = vehicleBody.sold === "Sim" ? true : false;
    const result = await vehicle.create(vehicleBody);
    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const update = async (vehicleReq, res) => {
  try {
    const vehicleBody = vehicleReq.body;
    const { id } = vehicleReq.params;
    await validateRequiredData(vehicleBody);

    const vehicles = {
      vehicle: vehicleBody.vehicle,
      brand: vehicleBody.brand,
      year: vehicleBody.year,
      description: vehicleBody.description,
      sold: vehicleBody.sold == "Sim" ? true : false,
    };

    const result = await vehicle.update(vehicles, {
      where: { id: id },
    });

    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const patch = async (vehicleReq, res) => {
  try {
    const vehicleBody = vehicleReq.body;
    const { id } = vehicleReq.params;
    if (
      !vehicleBody.vehicle &&
      !vehicleBody.brand &&
      !vehicleBody.year &&
      !vehicleBody.description &&
      (vehicleBody.sold === undefined || vehicleBody.sold === null)
    )
      throw new Error("Por favor, insira os parâmetros !");

    vehicleOri = await vehicle.findByPk(id);

    if (!vehicleOri) throw new Error("Id do veículo inválido!");

    //if (vehicleReq.brand) await validatebrand(brand);

    const vehicles = {
      vehicle: vehicleBody.vehicle || vehicleOri.vehicle,
      brand: vehicleBody.brand || vehicleOri.brand,
      year: vehicleBody.year || vehicleOri.year,
      description: vehicleBody.description || vehicleOri.description,
      createdAt: vehicleOri.dataValues.createdAt,
      updatedAt: new Date(),
    };

    const result = await vehicle.update(vehicles, {
      where: { id: id },
    });

    return res.send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await vehicle.destroy({ where: { id: id } });
    return res.send({ values: result });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  findAll,
  findById,
  findByNotSold,
  findByDecade,
  findByManufacturer,
  findByLastWeek,
  create,
  update,
  patch,
  remove,
};
