import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HSKCard = ({ level, color, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={color}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.levelText}>{level}</Text>
      <Text style={styles.subText}>Cấp độ mới - Bắt đầu ngay</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>BẮT ĐẦU</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const levels = [
    { id: 1, name: 'HSK 1', color: ['#6a11cb', '#2575fc'] },
    { id: 2, name: 'HSK 2', color: ['#ff9966', '#ff5e62'] },
    { id: 3, name: 'HSK 3', color: ['#00b09b', '#96c93d'] },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>CHÀO MỪNG ĐẾN EZHSK</Text>
          <Text style={styles.subtitle}>Hãy chọn cấp độ bạn muốn học</Text>
        </View>

        <View style={styles.grid}>
          {levels.map((lvl) => (
            <HSKCard
              key={lvl.id}
              level={lvl.name}
              color={lvl.color}
              onPress={() => navigation.navigate('LessonList', { 
                levelId: `hsk${lvl.id}`, 
                levelTitle: lvl.name 
              })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    fontFamily: 'Inter_Bold', // Giả định đã load font
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  grid: {
    gap: 20,
  },
  card: {
    borderRadius: 20,
    padding: 25,
    height: 180,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  levelText: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: '900',
  },
  subText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

export default HomeScreen;
