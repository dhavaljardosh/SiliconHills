import React, { Component } from "react";
import { View, Text, Button, Platform } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import GetLocation from "react-native-get-location";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class StoreLocator extends Component {
  state = {
    location: "",
    errorMessage: ""
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    const { errorMessage, location } = this.state;
    return (
      <View>
        <View style={{ padding: 20, background: "lightblue" }}>
          {location ? (
            <MapView
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.98,
                longitudeDelta: 0.78
              }}
              style={{
                height: 200,
                width: "100%"
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
                }}
                title="Your Location"
              />
            </MapView>
          ) : (
            <Text>LOADING</Text>
          )}
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            padding: 20,
            borderBottomColor: "gray",
            borderBottomWidth: 1
          }}
        >
          Nearby HEB Stores:
        </Text>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("Overview");
          }}
        >
          <View style={{ padding: 20 }}>
            <Text>8040 Mesa Dr, Austin, TX 78731</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("Overview");
          }}
        >
          <View style={{ padding: 20 }}>
            <Text>10900 Research Blvd, Austin, TX 78759</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("Overview");
          }}
        >
          <View style={{ padding: 20 }}>
            <Text>1500 W 35th St, Austin, TX 78703</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("Overview");
          }}
        >
          <View style={{ padding: 20 }}>
            <Text>5311 Balcones Dr, Austin, TX 78731</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("Overview");
          }}
        >
          <View style={{ padding: 20 }}>
            <Text>8040 Mesa Dr, Austin, TX 78731</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
