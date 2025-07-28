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