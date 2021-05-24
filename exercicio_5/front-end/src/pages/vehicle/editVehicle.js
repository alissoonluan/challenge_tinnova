import React, { useState } from "react";
import {
  Input,
  InputLabel,
  FormControl,
  TextField,
  MenuItem,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import "./vehicle.css";

const EditVehicles = ({ location }) => {
  const history = useHistory();
  const validateSold = location.state.row.sold === true ? "Sim" : "Nao";
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState(location.state.row.vehicle);
  const [brand, setBrand] = useState(location.state.row.brand);
  const [year, setYear] = useState(location.state.row.year);
  const [description, setDescription] = useState(
    location.state.row.description
  );
  const [sold, setSold] = useState(validateSold);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const result = await api.put(`/${location.state.row.id}`, {
        vehicle: vehicle,
        brand: brand,
        year: year,
        description: description,
        sold: sold,
        updatedAt: new Date(),
      });

      if (result) {
        notify("Veículo atualizado com sucesso.", true, "info");

        history.push("/");
        history.go(0);
      }
    } catch (error) {
      notify("Falha ao editar Veículo.");
      return setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {loading && <ModalLoading loading={loading} />}

        <div className="containerFormUser">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <ArrowBackIcon className="iconGoBack" onClick={history.goBack} />

              <label className="title">Editar Veículo</label>

              <FormControl className="formControl" id="controlVehicle">
                <InputLabel>Veículo*</InputLabel>
                <Input
                  required
                  autoFocus
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                />
              </FormControl>

              <FormControl className="formControl" id="controlVehicle">
                <InputLabel>Descrição*</InputLabel>
                <Input
                  required
                  autoFocus
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl className="formControl" id="controlVehicle">
                <InputLabel>Ano*</InputLabel>
                <Input
                  required
                  autoFocus
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </FormControl>

              <div className="textList">
                <TextField
                  required
                  select
                  label="Vendido"
                  value={sold}
                  onChange={(e) => setSold(e.target.value)}
                  helperText="Selecione se o Veículo foi vendido"
                >
                  {["Sim", "Nao"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="textList">
                <TextField
                  required
                  select
                  label="Marca"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  helperText="Selecione a Marca"
                >
                  {[
                    "toyota",
                    "volkswagen",
                    "ford",
                    "honda",
                    "hyundai",
                    "bmw",
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <button
                id="buttonStyle"
                type="submit"
                className="btn btn-info btn-block"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditVehicles;
