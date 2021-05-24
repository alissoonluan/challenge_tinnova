import React, { useState } from "react";
import {
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import "./vehicle.css";

const CreateVehicle = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [sold, setSold] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const { data } = await api.post("/", {
        vehicle,
        brand,
        year,
        description,
        sold,
      });

      setLoading(false);

      if (data) {
        notify("Veículo criado com sucesso!", true, "info");
        history.push("/");
        history.go(0);
      }
    } catch (error) {
      notify("Falha ao criar Veículo.");
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

              <label className="title">Novo Veículo</label>

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
                  type="textarea"
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
                Inserir
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default CreateVehicle;
