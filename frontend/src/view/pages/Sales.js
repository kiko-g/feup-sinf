import React from "react";
import { CRow, CCol } from "@coreui/react";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import COGS from "../components/COGS";
import AOV from "../components/AOV";
import SalesRegion from "../components/SalesRegion";
import TopProducts from "../components/TopProducts";
import ProfitMargin from "../components/ProfitMargin";
import GetSalesData from "../../viewmodel/providers/getSalesData";
import ResourceGetter from "../components/ResourceGetter";
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const RenderSales = (data) => {
  const profitMargin = [
    {
      label: "Gross Profit Margin",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
      data: data.profitMargin.grossProfit,
    },
    {
      label: "Net Profit Margin",
      backgroundColor: hexToRgba(brandSuccess, 10),
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
      data: data.profitMargin.netProfit,
    },
  ];

  return (
    <>
      <CRow>
        <CCol sm="6" lg="6" className="d-flex align-items-stretch">
          <COGS dataset={data.cogs} />
        </CCol>
        <CCol sm="6" lg="6" className="d-flex align-items-stretch">
          <AOV dataset={data.aov} />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <ProfitMargin
            profitMargin={profitMargin}
            year={2019}
            heightValue="auto"
          />
        </CCol>
        <CCol>
          <SalesRegion
            labels={["America", "China", "Europe", "Australia", "Africa"]}
            datasets={data.salesRegion}
            year={2019}
          />
        </CCol>
      </CRow>
      <TopProducts
        fields={["name", "price", "totalSold", "status"]}
        productsData={data.topProducts}
        year={2019}
      />
    </>
  );
};

const Sales =  (year) => <ResourceGetter func={() => GetSalesData(year)} componentToRender={RenderSales}/>;
export default Sales;