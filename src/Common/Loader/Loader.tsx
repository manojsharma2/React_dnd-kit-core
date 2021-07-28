import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = (props: any) => {
  const styles = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <>
      <div style={styles}>
        <CircularProgress color="secondary" />
      </div>
    </>
  );
};
export default Loader;
