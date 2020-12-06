import ProductInfo from "../../../model/productInfo";
import {getOrdersRequest, getProductsRequest} from "../requests";

export const capsReducer = (accumulator: string, value: string, index: number, array: Array<string>) => {
  value = value.toLowerCase();
  return accumulator + " " + value[0].toUpperCase() + value.slice(1)
};

const parseItemKey = (itemKey: string) => {
  return itemKey.split("_").reduce(capsReducer, "")
};

const getStatus = (isActive: boolean, isDeleted: boolean, isDraft: boolean) => {
  if(isActive) return "Active";
  if(isDeleted) return "Deleted";
  if(isDraft) return "Pending";
  return "Inactive";
}

const getTopProducts = async (year: number): Promise<Array<ProductInfo>> => {
  const jsonProducts = await getProductsRequest(year);

  const products = [];

  for (let i = 0; i < jsonProducts.data.length; i++) {
    const jsonProduct = jsonProducts.data[i];

    const id = jsonProduct.itemKey;
    const name = parseItemKey(id);
    const details = jsonProduct.complementaryDescription;

    const priceListLines = jsonProduct.priceListLines;

    const price = priceListLines.reduce((accumulator: number, priceListLine: any) => {
      return accumulator + priceListLine.priceAmount.amount
    }, 0) / priceListLines.length;

    const totalSold = 0;

    const status = getStatus(jsonProduct.isActive, jsonProduct.isDeleted, jsonProduct.isDraft);

    products.push({
      id: id,
      name: name,
      price: price,
      totalSold: totalSold,
      details: details,
      status: status
    });
  }

  const jsonOrders = await getOrdersRequest(year);

  for (let i = 0; i < jsonOrders.data.length; i++) {
    const documentLines = jsonOrders.data[i].documentLines;

    for (let j = 0; j < documentLines.length; j++) {
      const documentLine = documentLines[j];

      for (let k = 0; k < products.length; k++) {
        if(products[k].id == documentLine.salesItem) {
          products[k].totalSold += documentLine.quantity;
          break;
        }
      }
    }
  }

  return products;
}

export default getTopProducts;
