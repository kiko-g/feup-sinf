import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import MonthlyAvgInv from "../components/MonthlyAvgInv";
import MontlyAvgTurn from "../components/MontlyAvgTurn";
import TopProducts from "../components/TopProducts";
import ResourceGetter from "../components/ResourceGetter";
import getInventoryData from "../../viewmodel/providers/getInventoryData";
import {formatNumber} from "./Procurement";

const RenderInventory = (data) => {
  const monthlyAvgTurn = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    sold: {
      total: data.soldTotal,
      data: data.sold,
      label: "Sold",
    },
    replaced: {
      total: data.replacedTotal,
      data: data.replaced,
      label: "Replaced",
    },
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h4 className="card-title mb-0">Total Assets in Stock</h4>
              <div className="small text-muted">{data.year}</div>
            </CCardHeader>
            <CCardBody>
              <h4>$ {formatNumber(data.assets)}</h4>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              <h4 className="card-title mb-0">
                Average Days to Sell Inventory
              </h4>
              <div className="small text-muted">{data.year}</div>
            </CCardHeader>
            <CCardBody>
              <h4>{data.daysToSell}</h4>
            </CCardBody>
          </CCard>
          <MonthlyAvgInv dataset={data.monthlyAvgInv} year={data.year} />
        </CCol>
        <CCol md="6">
          <MontlyAvgTurn
            labels={monthlyAvgTurn.labels}
            data1={monthlyAvgTurn.sold}
            data2={monthlyAvgTurn.replaced}
            year={data.year}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol>
          <TopProducts productsData={data.topProducts} year={data.year} />
        </CCol>
      </CRow>
    </>
  );
};

const Inventory = (year) => (
  <ResourceGetter
    func={() => getInventoryData(year)}
    componentToRender={RenderInventory}
  />
);

export default Inventory;
