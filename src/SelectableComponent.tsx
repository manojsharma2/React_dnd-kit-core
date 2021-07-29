import React from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";

import { Selectable } from "./SelectTable/Selectable";

export default function SelectableComponent() {
  return (
    <>
      <Selectable
        columns={2}
        strategy={rectSortingStrategy}
        wrapperStyle={() => ({
          width: 150,
          height: 150,
        })}
      />
    </>
  );
}
