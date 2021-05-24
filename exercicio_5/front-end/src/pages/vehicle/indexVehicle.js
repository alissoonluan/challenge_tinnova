import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Button,
  Box,
  MenuItem,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { Card, CardHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function createData(
  id,
  vehicle,
  brand,
  year,
  description,
  sold,
  created,
  updated
) {
  return {
    id,
    vehicle,
    brand,
    year,
    description,
    sold,
    created,
    updated,
  };
}

const headCells = [
  {
    name: "id",
    numeric: false,
    disablePadding: false,
    label: "id",
    sort: true,
  },
  {
    name: "veiculo",
    numeric: false,
    disablePadding: false,
    label: "Veículo",
    sort: false,
  },
  {
    name: "marca",
    numeric: false,
    disablePadding: false,
    label: "Marca",
    sort: false,
  },
  {
    name: "ano",
    numeric: false,
    disablePadding: false,
    label: "Ano",
    sort: false,
  },
  {
    name: "descricao",
    numeric: false,
    disablePadding: false,
    label: "Descrição",
    sort: false,
  },
  {
    name: "vendido",
    numeric: false,
    disablePadding: false,
    label: "Vendido",
    sort: false,
  },

  {
    name: "acoes",
    numeric: false,
    disablePadding: false,
    label: "Ações",
    sort: false,
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell align="center" key={headCell.name} padding={"default"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  row: {
    margin: "1px",
  },
}));

const IndexVehicle = () => {
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsFilter, setRowsFilter] = useState([]);
  const [filterSelected, setFilterSelected] = useState(null);
  const [decadeFrom, setDecadeFrom] = useState("");
  const [decadeTo, setDecadeTo] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [notSold, setNotSold] = useState("");
  const [lastWeek, setLastWeek] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await api.get("/");
        const values = response.values;

        const employees = values.map((employee) => {
          return createData(
            employee.id,
            employee.vehicle,
            employee.brand,
            employee.year,
            employee.description,
            employee.sold
          );
        });
        setRows(employees);
        setRowsFilter(employees);
        setAllRows(values);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((d) => d.description);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleNewInsert = () => {
    history.push("/create");
  };

  const handleEdit = (id) => {
    const rowEdit = allRows.find((rw) => rw.id === id);
    if (rowEdit) {
      history.push("/edit", { row: rowEdit });
    } else {
      notify("Registro não encontrado.");
    }
  };

  const handleDelete = async (id, vehicle) => {
    if (window.confirm(`Você realmente quer apagar o Veículo: ${vehicle}`)) {
      const rowDelete = allRows.find((rw) => rw.id === id);

      if (rowDelete) {
        try {
          setLoading(true);

          const deleteItem = await api.delete(`/${id}`);

          if (deleteItem) {
            const removeItem = rows.filter((item) => item.id !== id);
            setRows(removeItem);
            setRowsFilter(removeItem);
            notify("Veículo deletado com sucesso.", true, "info");
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          notify("Falha ao deletar Veículo");
        }
      } else {
        notify("Registro não encontrado.");
      }
    }
  };

  const handleFilter = async () => {
    const functionSelect = {
      "Por decada": findByDecade,
      "Por fabricante": findByManufacturer,
      "Ultima semana": findByLastWeek,
    };

    if (filterSelected) {
      await functionSelect[filterSelected]();
    }
  };

  const findByDecade = async () => {
    const { data: resultSold } = await api.get(
      `/find/decade/${decadeFrom}/${decadeTo}`
    );

    const values = resultSold.values;

    const employees = values.map((employee) => {
      return createData(
        employee.id,
        employee.vehicle,
        employee.brand,
        employee.year,
        employee.description,
        employee.sold
      );
    });
    setRows(employees);
    setRowsFilter(employees);
    setAllRows(values);
  };

  const findByManufacturer = async () => {
    const { data: resultSold } = await api.get(
      `/find/manufacturer/${manufacturer}`
    );

    const values = resultSold.values;

    const employees = values.map((employee) => {
      return createData(
        employee.id,
        employee.vehicle,
        employee.brand,
        employee.year,
        employee.description,
        employee.sold
      );
    });
    setRows(employees);
    setRowsFilter(employees);
    setAllRows(values);
  };

  const findByLastWeek = async () => {
    const { data: resultSold } = await api.get(`/find/lastweek`);

    const values = resultSold.values;

    const employees = values.map((employee) => {
      return createData(
        employee.id,
        employee.vehicle,
        employee.brand,
        employee.year,
        employee.description,
        employee.sold
      );
    });
    setRows(employees);
    setRowsFilter(employees);
    setAllRows(values);
  };

  const findByNotSold = async () => {
    const { data: resultSold } = await api.get(`/find/notsold`);

    const values = resultSold.values.count;

    setNotSold(values);
  };

  useEffect(() => {
    findByNotSold();
  });

  return (
    <>
      {loading && <ModalLoading loading={loading} />}

      <div>
        <div className="containerTable">
          <>
            <Card className="card-default">
              <CardHeader className={classes.row}>
                <Box
                  display="flex"
                  p={0}
                  style={{ paddingLeft: "7px", alignItems: "center" }}
                >
                  <div className="textList">
                    <TextField
                      required
                      select
                      label="Filtro"
                      value={filterSelected || ""}
                      onChange={(e) => setFilterSelected(e.target.value)}
                      helperText="Selecione a filtro"
                    >
                      {["Por decada", "Por fabricante", "Ultima semana"].map(
                        (option) => (
                          <MenuItem key={option} value={option || ""}>
                            {option}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </div>

                  {filterSelected === "Por fabricante" && (
                    <div className="textList">
                      <TextField
                        required
                        select
                        label="Marca"
                        value={manufacturer || ""}
                        onChange={(e) => setManufacturer(e.target.value)}
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
                          <MenuItem key={option} value={option || ""}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  )}

                  {filterSelected === "Por decada" && (
                    <div className="textList">
                      <TextField
                        required
                        type="number"
                        label="De"
                        value={decadeFrom || ""}
                        onChange={(e) => setDecadeFrom(e.target.value)}
                        helperText="Selecione o ano"
                      />

                      <TextField
                        required
                        type="number"
                        label="Até"
                        value={decadeTo || ""}
                        onChange={(e) => setDecadeTo(e.target.value)}
                        helperText="Selecione o ano"
                      />
                    </div>
                  )}

                  {filterSelected === "Ultima semana" && (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={lastWeek || ""}
                          onChange={(e) => setLastWeek(e.target.checked)}
                          name="lestWeek"
                          color="primary"
                        />
                      }
                      label="Última semana"
                    />
                  )}

                  <Button
                    variant="contained"
                    size="large"
                    id="buttonInserir"
                    onClick={handleFilter}
                    style={{ marginRight: "8%" }}
                  >
                    FILTRAR
                  </Button>

                  <div style={{ marginRight: "8%", color: "Black" }}>
                    <label className="title">Veículos</label>
                  </div>

                  <Box p={2}>
                    <Button
                      variant="contained"
                      size="large"
                      id="buttonInserir"
                      onClick={handleNewInsert}
                    >
                      INSERIR
                    </Button>
                  </Box>

                  <div>
                    <label
                      style={{
                        fontSize: "18px",
                        color: "Black",
                      }}
                      className="title"
                    >
                      Não vendidos: {notSold || ""} Veículos
                    </label>
                  </div>
                </Box>
              </CardHeader>
              <hr />
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="medium"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rowsFilter.length}
                  />
                  <TableBody>
                    {rowsFilter.map((row, index) => {
                      return (
                        <TableRow hover tabIndex={-1} key={index}>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">{row.vehicle}</TableCell>
                          <TableCell align="center">{row.brand}</TableCell>
                          <TableCell align="center">{row.year}</TableCell>
                          <TableCell align="center">
                            {row.description}
                          </TableCell>
                          <TableCell align="center">
                            {row.sold === true ? (
                              <DoneIcon style={{ color: "Green" }} />
                            ) : (
                              <CloseIcon color="error" />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Editar">
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEdit(row.id)}
                              >
                                <EditIcon className="iconAtivo" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Deletar">
                              <IconButton
                                aria-label="delete"
                                onClick={() =>
                                  handleDelete(row.id, row.vehicle)
                                }
                              >
                                <DeleteIcon className="iconAtivo" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </>
        </div>
      </div>
    </>
  );
};

export default IndexVehicle;
