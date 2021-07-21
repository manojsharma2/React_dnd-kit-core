import React from "react";
import {rectSortingStrategy} from "@dnd-kit/sortable";

import {Selectable} from "./SelectTable/Selectable";

export default function App() {
  return (
     <Selectable
        columns={4}
        strategy={rectSortingStrategy}
        wrapperStyle={() => ({
          width: 150,
          height: 150
        })}
     />
  );
}
