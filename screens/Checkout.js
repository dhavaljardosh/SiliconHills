import React from "react";
import { View, Text } from "react-native";
import { Icon, Label } from "../components";
import { Input, Content, Item } from "native-base";

const Checkout = props => {
  const total = props.navigation.getParam("total");
  return (
    <View>
      <Content>
        <Item>
          <Input placeholder="Textbox with Success Input" />
        </Item>
      </Content>
      <Text style={{ fontWeight: "700", fontSize: 40 }}>
        Your Total: {JSON.stringify(total)}
      </Text>
      <Icon pay />
    </View>
  );
};

export default Checkout;
