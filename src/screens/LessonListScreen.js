import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import data from '../data/data.json';

const LessonListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { levelId, levelTitle } = route.params;

  // Filter lessons based on HSK level (e.g., 'hsk1')
  const lessons = data[levelId] || [];

  const renderLessonItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => navigation.navigate('LessonDetail', { 
        lessonId: item.id, 
        lessonData: item 
      })}
    >
      <View style={styles.lessonNumberContainer}>
        <Text style={styles.lessonNumber}>{index + 1}</Text>
      </View>
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonSubtitle}>{item.title_vn}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{levelTitle}</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLessonItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Đang cập nhật nội dung cho cấp độ này...</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 34,
  },
  listContent: {
    padding: 15,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lessonNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eef2f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  lessonNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  lessonSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default LessonListScreen;
