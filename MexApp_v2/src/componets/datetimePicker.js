import React, { useState } from "react";
import { Button, Pressable, View ,Image} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Example = (props) => {
  //const context
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    props.setDato(date)
    //console.warn("A date has been picked: ", props.dato);
    hideDatePicker();
  };
  var logo=require('../drawables/userlogo.png')

  return (
    <View>
      <Pressable onPress={showDatePicker}>
      <Image  source={props.logo}  style={{width:25,height:40,resizeMode:'contain',}}/>
      </Pressable>
    
  
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={props.mode}
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Example;