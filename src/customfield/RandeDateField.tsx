/** @format */

import React, { useEffect, useState } from "react";
import { DateTimeFieldBinding, FieldDescription, FieldProps } from "firecms";

interface datesFieldProps {
  dates: [Date, Date];
}

export default function RangeDateField(
  fieldProps: FieldProps<Date[], datesFieldProps>
) {
  const [startDate, setStartDate] = useState<Date>(
    fieldProps.value ? fieldProps.value[0] : new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    fieldProps.value ? fieldProps.value[1] : new Date()
  );
  const [error, setError] = useState("");

  useEffect(() => {
    fieldProps.setValue([startDate, endDate]);
    console.log(fieldProps);
  }, [startDate, endDate]);

  return (
    <>
      <DateTimeFieldBinding
        setFieldValue={fieldProps.setFieldValue}
        tableMode={true}
        customProps={null}
        initialValue={new Date()}
        isSubmitting={false}
        underlyingValueHasChanged
        partOfArray={false}
        context={fieldProps.context}
        setValue={(date) => {
          if (date) setStartDate(date);
        }}
        propertyKey={"startDate"}
        value={startDate}
        autoFocus
        touched={false}
        property={{
          name: "Fecha inicio",
          dataType: "date",
          mode: "date",
          resolved: true,
          fromBuilder: true,
        }}
        error={error}
        showError={error != ""}
        disabled={false}
        includeDescription
      ></DateTimeFieldBinding>
      <DateTimeFieldBinding
        setFieldValue={fieldProps.setFieldValue}
        tableMode={true}
        customProps={null}
        initialValue={new Date()}
        isSubmitting={false}
        underlyingValueHasChanged
        partOfArray={false}
        context={fieldProps.context}
        setValue={(date) => {
          if (date) setEndDate(date);
        }}
        propertyKey={"endDate"}
        value={endDate}
        autoFocus
        error={error}
        showError={error != ""}
        disabled={false}
        touched={false}
        property={{
          name: "Fecha fin",
          dataType: "date",
          mode: "date",
          resolved: true,
          fromBuilder: true,
        }}
        includeDescription
      ></DateTimeFieldBinding>
      <FieldDescription property={fieldProps.property} />
    </>
  );
}
