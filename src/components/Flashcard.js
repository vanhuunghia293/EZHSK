import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Flashcard = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipValue = useSharedValue(0);

  const flipCard = () => {
    if (isFlipped) {
      flipValue.value = withTiming(0, { duration: 500 });
    } else {
      flipValue.value = withTiming(180, { duration: 500 });
    }
    setIsFlipped(!isFlipped);
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(flipValue.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      zIndex: flipValue.value <= 90 ? 1 : 0,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(flipValue.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      zIndex: flipValue.value > 90 ? 1 : 0,
    };
  });

  const speak = () => {
    if (word?.hanzi) {
      Speech.speak(word.hanzi, { language: 'zh-CN' });
    }
  };

  if (!word) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.hintText}>Dữ liệu thẻ lỗi</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard} style={styles.cardWrapper}>
        {/* Front Side */}
        <Animated.View style={[styles.card, styles.frontCard, frontStyle]}>
          <TouchableOpacity style={styles.ttsButton} onPress={speak}>
            <Ionicons name="volume-high" size={28} color="#6a11cb" />
          </TouchableOpacity>
          <Text style={styles.hanziText}>{word?.hanzi || '?'}</Text>
          <Text style={styles.pinyinText}>{word?.pinyin || ''}</Text>
          <Text style={styles.typeText}>{word?.type ? `[${word.type}]` : ''}</Text>
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>Chạm để xem nghĩa</Text>
          </View>
        </Animated.View>

        {/* Back Side */}
        <Animated.View style={[styles.card, styles.backCard, backStyle]}>
          <Text style={styles.meaningText}>{word?.meaning || 'Chưa có nghĩa'}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: width * 0.85,
    marginVertical: 20,
    alignSelf: 'center',
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 25,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  frontCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  backCard: {
    backgroundColor: '#6a11cb',
    transform: [{ rotateY: '180deg' }],
  },
  hanziText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  pinyinText: {
    fontSize: 24,
    color: '#666',
    marginBottom: 5,
  },
  typeText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  meaningText: {
    fontSize: 32,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  ttsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#F5F5FF',
    borderRadius: 20,
  },
  hintContainer: {
    position: 'absolute',
    bottom: 30,
  },
  hintText: {
    fontSize: 12,
    color: '#BBB',
  },
});

export default Flashcard;
