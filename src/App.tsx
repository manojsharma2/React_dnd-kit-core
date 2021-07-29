import React from "react";

import SelectableComponent from "./SelectableComponent";
import PhotoEditor from "./PhotoEditor/PhotoEditor";
import PhotoEditorV2 from "./PhotoEditor/PhotoEditorV2";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <SelectableComponent />
          </Route>
          <Route path="/photoEditor" exact>
            <PhotoEditor />
          </Route>
          <Route path="/photoEditorv2" exact>
            <PhotoEditorV2 />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
