/** @format */
import React, { ReactElement } from "react";
import { PropertyPreviewProps } from "firecms";
import { Box } from "@mui/material";

export default function RangeDatePreview({
  value,
  property,
  entity,
  size,
}: PropertyPreviewProps<Date[]>): ReactElement {
  return (
    <>
      <Box>
        <span style={{ color: "green" }}>Fecha Inicial:</span>
        {` ${value[0].toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
        <br></br>
        <span style={{ color: "green" }}>Fecha Final:</span>
        {` ${value[1].toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
      </Box>
    </>
  );
}
