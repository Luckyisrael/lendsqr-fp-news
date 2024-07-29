import { Text } from 'lib';
import React from 'react';
import { StyleSheet, View, Modal, Animated } from 'react-native';

const Loading = ({ size = 50, color = '#000', style }) => {
  const bounceValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const bounce = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  return (
    <View style={styles.modal}>
      <Modal visible animationType="slide" transparent>
        <View style={[styles.container, { width: size, height: size }, style]}>
          <Animated.View
            style={[
              styles.dot,
              { width: size, height: size, backgroundColor: color },
              { transform: [{ scale: bounce }] },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              { width: size, height: size, backgroundColor: color, opacity: 0.5 },
              { transform: [{ scale: bounceValue }] },
            ]}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  spinner: {
    borderWidth: 3,
    borderRadius: 50,
    borderTopColor: 'transparent',
  },
  dot: {
    position: 'absolute',
    borderRadius: 50,
  },
});
