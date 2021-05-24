const express = require("express");
const VehicleController = require("./controllers/vehicleController");

const routes = express.Router();

routes.get("/", VehicleController.findAll);
routes.get("/:id", VehicleController.findById);

routes.get("/find/notsold", VehicleController.findByNotSold);
routes.get("/find/decade/:from/:to", VehicleController.findByDecade);
routes.get(
  "/find/manufacturer/:manufacturer",
  VehicleController.findByManufacturer
);
routes.get("/find/lastweek", VehicleController.findByLastWeek);

routes.post("/", VehicleController.create);
routes.put("/:id", VehicleController.update);
routes.patch("/:id", VehicleController.patch);
routes.delete("/:id", VehicleController.remove);

module.exports = routes;
