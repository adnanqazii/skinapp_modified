import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PhoneButton = ({ onPress,text,color }) => {
  return (
    <TouchableOpacity
      style={[styles.button,
    {backgroundColor: `${color}`}]}
      onPress={onPress}
      activeOpacity={0.8}
      
    >
      <Icon name="phone" size={24} color="#fff" />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default PhoneButton;