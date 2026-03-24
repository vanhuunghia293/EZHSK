import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Flashcard from '../components/Flashcard';

const LessonDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { lessonData } = route.params;
  const [activeTab, setActiveTab] = useState('vocabulary');

  const tabs = [
    { id: 'vocabulary', label: 'Từ mới', icon: 'book-outline' },
    { id: 'text', label: 'Bài khóa', icon: 'document-text-outline' },
    { id: 'grammar', label: 'Ngữ pháp', icon: 'school-outline' },
    { id: 'exercise', label: 'Luyện tập', icon: 'pencil-outline' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'vocabulary':
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {lessonData.vocabulary.map((item, index) => (
              <Flashcard 
                key={index}
                word={item}
              />
            ))}
          </ScrollView>
        );
      case 'text':
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              {lessonData.text ? lessonData.text.map((line, index) => (
                <View key={index} style={styles.textLine}>
                  <Text style={styles.role}>{line.role}:</Text>
                  <View style={styles.textContent}>
                    <Text style={styles.chineseText}>{line.content}</Text>
                    <Text style={styles.pinyinText}>{line.pinyin}</Text>
                    <Text style={styles.translationText}>{line.translation}</Text>
                  </View>
                </View>
              )) : <Text style={styles.emptyText}>Chưa có bài khóa</Text>}
            </View>
          </ScrollView>
        );
      case 'grammar':
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
             {lessonData.grammar ? lessonData.grammar.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.grammarTitle}>{item.title}</Text>
                <Text style={styles.grammarContent}>{item.content}</Text>
              </View>
            )) : <Text style={styles.emptyText}>Chưa có ngữ pháp</Text>}
          </ScrollView>
        );
      case 'exercise':
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {lessonData.exercises ? lessonData.exercises.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.exerciseQuestion}>{index + 1}. {item.question}</Text>
                <TouchableOpacity style={styles.showAnswerButton}>
                  <Text style={styles.showAnswerText}>Xem đáp án</Text>
                </TouchableOpacity>
              </View>
            )) : <Text style={styles.emptyText}>Chưa có bài tập</Text>}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle} numberOfLines={1}>{lessonData.title}</Text>
          <Text style={styles.headerSubtitle}>{lessonData.title_vn}</Text>
        </View>
        <TouchableOpacity style={styles.audioButton}>
          <Ionicons name="volume-medium-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabItem, activeTab === tab.id && styles.activeTabItem]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.id ? '#007bff' : '#666'} 
            />
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#e0e0e0',
  },
  audioButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: '#007bff',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    color: '#666',
  },
  activeTabLabel: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textLine: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  role: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007bff',
    width: 25,
  },
  textContent: {
    flex: 1,
    paddingLeft: 5,
  },
  chineseText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
  },
  pinyinText: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 2,
  },
  translationText: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  grammarTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  grammarContent: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  exerciseQuestion: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  showAnswerButton: {
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  showAnswerText: {
    color: '#007bff',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  }
});

export default LessonDetailScreen;
