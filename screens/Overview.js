import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";

import { Block, Card, Text, Icon, Label } from "../components";
import * as theme from "../constants/theme";
import { DrawerActions } from "react-navigation";
import ProductCard from "../components/ProductCard";
import { Button, View } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeScannerExample from "../components/Barcode";
import result from "../constants/data";

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.white
  },
  margin: {
    marginHorizontal: 10
  },
  driver: {
    marginBottom: 11
  },
  avatar: {
    width: 48,
    height: 48
  }
});

class Overview extends Component {
  state = {
    purchased: [],
    purchasedUPC: [],
    total: 0
  };

  static navigationOptions = ({ navigation }) => ({
    headerLeftContainerStyle: {
      paddingLeft: 24
    },
    headerRightContainerStyle: {
      paddingRight: 24
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Icon menu />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Checkout")}>
        <Icon checkout />
      </TouchableOpacity>
    ),
    headerTitle: (
      <Block row middle>
        <Text h4>Shopping Cart</Text>
      </Block>
    )
  });

  getTotal = () => {
    if (this.state.purchased) {
      let total = 0;
      this.state.purchased.map(item => {
        total += item.price;
      });
      this.setState({ total });
    }
  };

  getScannedCode = upc => {
    console.log(upc);
    var updatedList = this.state.purchasedUPC;
    updatedList.push(upc);

    this.getPurchasedItemsDescription(updatedList);

    this.setState({ purchasedUPC: updatedList });
  };

  getPurchasedItemsDescription = listOfUPC => {
    var output = [];
    for (let singleUPC of listOfUPC) {
      for (let i of result.docs) {
        if (i.pid === singleUPC) {
          output.push(i);
        }
      }
    }

    this.setState({ purchased: output }, () => this.getTotal());
  };

  render() {
    return (
      <SafeAreaView style={styles.overview}>
        <ScrollView contentContainerStyle={{ paddingVertical: 5 }}>
          {/* Status */}
          <Card
            row
            middle
            style={[
              styles.margin,
              { marginTop: 18, backgroundColor: "lightgreen" }
            ]}
          >
            <Block flex={1.2} center middle style={{ marginRight: 20 }}>
              <Text style={{ fontWeight: "600" }}>
                Total: ${this.state.total}
              </Text>
            </Block>
          </Card>

          {this.state.purchased.length > 0 && (
            <Card
              title="Current Shopping List"
              style={[styles.margin, { marginTop: 18 }]}
            >
              {this.state.purchased.map((item, index) => {
                return <SingleItemView item={item} key={index} />;
              })}
            </Card>
          )}

          {this.state.purchased.length === 0 && (
            <Card style={[styles.margin, { marginTop: 18 }]}>
              <Text>
                Your have no item in your shopping list, start Scanning
              </Text>
            </Card>
          )}
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            marginHorizontal: 30
          }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Checkout", {
                total: this.state.total
              })
            }
            style={{
              height: 60,
              borderRadius: 30,
              borderWidth: 3,
              borderColor: "green",
              padding: 20,
              fontWeight: "700",
              justifyContent: "center",
              margin: 10,
              flex: 1
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "green",
                  textAlign: "center"
                }}
              >
                Checkout
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("BarcodeReader", {
                getScannedCode: this.getScannedCode.bind(this)
              })
            }
            style={{
              height: 60,
              borderRadius: 30,
              borderWidth: 3,
              borderColor: "black",
              padding: 20,
              fontWeight: "700",
              width: 120,
              justifyContent: "center",
              margin: 10
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "black",
                  textAlign: "center"
                }}
              >
                Scan
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const SingleItemView = props => {
  return (
    <View>
      <View>
        <Text>{props.item.name}</Text>
      </View>
      <View>
        <Text style={{ fontWeight: "600" }}>{props.item.price}</Text>
      </View>
    </View>
  );
};

export default Overview;
