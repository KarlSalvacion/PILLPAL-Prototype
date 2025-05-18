import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';

interface WaterLevelIndicatorProps {
  currentIntake: number;
  totalGoal: number;
  size?: number;
  style?: ViewStyle;
}

const WaterLevelIndicator: React.FC<WaterLevelIndicatorProps> = ({
  currentIntake,
  totalGoal,
  size = 200,
  style,
}) => {
  const fillPercentage = Math.min((currentIntake / totalGoal) * 100, 100);
  const waterHeight = (fillPercentage / 100) * (size * 0.8);

  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedHeight, {
      toValue: waterHeight,
      useNativeDriver: false,
      friction: 8,
      tension: 40
    }).start();
  }, [waterHeight]);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Glass outline */}
      <View style={[styles.glass, { width: size * 0.6, height: size * 0.8 }]}>
        {/* Water fill */}
        <Animated.View 
          style={[
            styles.water,
            { 
              height: animatedHeight,
            }
          ]} 
        />
        {/* Water surface effect */}
        <Animated.View 
          style={[
            styles.waterSurface,
            { 
              bottom: animatedHeight,
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    borderWidth: 4,
    borderColor: '#177581',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  water: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(99, 176, 200)',
  },
  waterSurface: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default WaterLevelIndicator; 