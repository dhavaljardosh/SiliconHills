import React, { PureComponent } from "react";
import { Image } from "react-native";

const menuIcon = (
  <Image
    source={require("../assets/images/icons/menu.png")}
    style={{ height: 14, width: 18 }}
  />
);

const checkoutIcon = (
  <Image
    source={require("../assets/images/icons/checkout.png")}
    style={{ height: 22, width: 21 }}
  />
);

const vehicleIcon = (
  <Image
    source={require("../assets/images/icons/vehicle.png")}
    style={{ height: 50, width: 50 }}
  />
);

const distanceIcon = (
  <Image
    source={require("../assets/images/icons/distance.png")}
    style={{ height: 50, width: 50 }}
  />
);

const optionsIcon = (
  <Image
    source={require("../assets/images/icons/options.png")}
    style={{ height: 16, width: 16 }}
  />
);

const payIcon = (
  <Image
    source={require("../assets/images/icons/pay_black.png")}
    style={{ height: 40, width: "100%" }}
  />
);

export default class Icon extends PureComponent {
  render() {
    const {
      menu,
      checkout,
      vehicle,
      distance,
      options,
      children,
      pay
    } = this.props;

    if (menu) return menuIcon;
    if (checkout) return checkoutIcon;
    if (vehicle) return vehicleIcon;
    if (distance) return distanceIcon;
    if (options) return optionsIcon;
    if (pay) return payIcon;

    return children || null;
  }
}
