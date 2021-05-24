import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CreateVehicles from "./pages/vehicle/createVehicle";
import EditVehicles from "./pages/vehicle/editVehicle";
import IndexVehicle from "./pages/vehicle/indexVehicle";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <>
            <Route path="/create" component={CreateVehicles} />
            <Route path="/edit" component={EditVehicles} />
            <Route path="/" component={IndexVehicle} />
          </>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
