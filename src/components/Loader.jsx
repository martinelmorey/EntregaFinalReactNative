// src/components/Loader.jsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const Loader = ({ 
  size = 'large', 
  color = '#4CAF50', 
  text = 'Cargando...', 
  style,
  showText = true
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {showText && <Text style={[styles.text, { color }]}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Loader