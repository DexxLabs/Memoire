import { FlatList, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { color } from '../assets/data/colors';

const MainScreen = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  // 🔹 Load notes from AsyncStorage
  useEffect(() => {
    const loadNotes = async () => {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    };
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.bg} />
      <Text style={styles.headerText}>MEMOIRE</Text>

      {/* 🔹 Use marginTop to prevent overlap */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 60, paddingBottom: 80 }} // Prevent overlap
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.noteItem} 
            onPress={() => navigation.navigate('Note', item)}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent} numberOfLines={2}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity 
        onPress={() => navigation.navigate('Note', { id: null, title: 'New Note', content: '' })} 
        style={styles.newButton}>
        <Image style={styles.plusButton} source={require('../assets/images/plus.png')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
    paddingHorizontal: 12,
  },
  headerText: {
    fontFamily: 'black',
    marginTop: 12,
    alignSelf: 'center',
    fontSize: 16,
    color: color.text2,
    letterSpacing: 4,
    position: 'absolute',
    top: 10,
    zIndex: 10, // Ensure it stays on top
  },
  noteItem: {
    backgroundColor: '#363737',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  noteContent: {
    fontSize: 14,
    color: 'white',
  },
  plusButton: {
    width: 15,
    height: 15,
  },
  newButton: {
    backgroundColor: color.accent,
    borderRadius: 10,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});
