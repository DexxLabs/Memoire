import React, { useEffect, useState, useCallback } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { color } from '../assets/data/colors';
import { f } from '../assets/data/fonts';

const Note = ({ route }) => {
  const { id, title, content } = route.params;
  const [titles, setTitle] = useState(title);
  const [contents, setContent] = useState(content);
  const [isEditing, setIsEditing] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  // 🔹 Load existing notes from AsyncStorage
  useEffect(() => {
    const loadNotes = async () => {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        const notesArray = JSON.parse(storedNotes);
        const existingNote = notesArray.find((n) => n.id === id);
        if (existingNote) {
          setTitle(existingNote.title);
          setContent(existingNote.content);
        }
      }
    };
    loadNotes();
  }, [id]);

  // 🔹 Save note to AsyncStorage
  const handleSave = useCallback(async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      let notesArray = storedNotes ? JSON.parse(storedNotes) : [];

      if (id) {
        // Update existing note
        notesArray = notesArray.map((note) =>
          note.id === id ? { ...note, title: titles, content: contents } : note
        );
      } else {
        // Create a new note with a unique ID
        const newNote = {
          id: Date.now(),
          title: titles,
          content: contents,
        };
        notesArray.push(newNote);
      }

      await AsyncStorage.setItem('notes', JSON.stringify(notesArray));
      setIsEditing(false);
      Keyboard.dismiss();
      navigation.goBack(); // Navigate back after saving
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }, [id, titles, contents, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            {/* Title Input */}
            <TextInput
              style={styles.headerText}
              value={titles}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor="#888"
            />

            {/* Notes Box (Editable & Read Mode) */}
            {isEditing ? (
              <TextInput
                style={styles.contentText}
                value={contents}
                onChangeText={setContent}
                placeholder="Start writing your notes..."
                placeholderTextColor="#888"
                multiline
                textAlignVertical="top"
                autoFocus
              />
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer} keyboardShouldPersistTaps="handled">
                <Pressable onPress={() => setIsEditing(true)}>
                  <Text style={styles.viewText}>{contents || 'Tap to edit...'}</Text>
                </Pressable>
              </ScrollView>
            )}

            {/* Save Button */}
            {isEditing && (
              <Pressable style={styles.tickButton} onPress={handleSave}>
                <Image style={styles.saveIcon} source={require('../assets/images/diskette.png')} />
              </Pressable>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: f.black,
    fontSize: 16,
    color: color.text2,
    letterSpacing: 4,
    marginBottom: 12,
  },
  contentText: {
    flex: 1,
    color: color.text2,
    fontFamily: f.s,
    fontSize: 15,
    borderWidth: 1,
    borderColor: color.accent,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    minHeight: 300,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: color.accent,
    borderRadius: 10,
    minHeight: 300,
  },
  viewText: {
    color: color.text2,
    fontFamily: f.s,
    fontSize: 15,
  },
  saveIcon: {
    width: 20,
    height: 20,
  },
  tickButton: {
    backgroundColor: color.accent,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
});

export default Note;
