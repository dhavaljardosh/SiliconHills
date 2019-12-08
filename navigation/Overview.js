import React from "react";
import { createStackNavigator } from "react-navigation";

import Overview from "../screens/Overview";
import ProductDetail from "../screens/ProductDetail";
import BarcodeReader from "../components/Barcode";
import StoreLocator from "../screens/StoreLocator";
import Checkout from "../screens/Checkout";
export default createStackNavigator({
  Overview,

  BarcodeReader,
  StoreLocator,
  ProductDetail,
  Checkout
});
