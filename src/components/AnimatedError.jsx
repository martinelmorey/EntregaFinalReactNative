import { Animated, Text, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { colors } from '../global/colors';

const AnimatedError = ({ message }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [message]);

  if (!message) return null;

  return (
    <Animated.Text style={[styles.error, { opacity }]}>
      {message}
    </Animated.Text>
  );
};

export default AnimatedError;

const styles = StyleSheet.create({
  error: {
    padding: 10,
    backgroundColor: colors.error,
    borderRadius: 5,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  }
});
