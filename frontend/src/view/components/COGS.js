import React from "react";
import { CWidgetDropdown } from "@coreui/react";
import ChartBarSimple from "../charts/ChartBarSimple";
import MoneyFormat from "../utils/MoneyFormat";

export default ({ dataset }) => {
  return (
    <CWidgetDropdown
      color="dark"
      className="w-100"
      header={"$ " + MoneyFormat(dataset.reduce((a, b) => a + b, 0))}
      text="Cost of Goods Sold"
      footerSlot={
        <ChartBarSimple
          style={{ height: "70px" }}
          backgroundColor="danger"
          dataPoints={dataset}
          pointHoverBackgroundColor="danger"
          label="COGS"
          labels="months"
        />
      }
    ></CWidgetDropdown>
  );
};
