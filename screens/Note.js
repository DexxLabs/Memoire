import React, { useEffect, useState, useCallback } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { color } from '../assets/data/colors';
import { f } from '../assets/data/fonts';

const Note = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [titles, setTitle] = useState(route.params.title);
  const [contents, setContent] = useState(route.params.content);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.headerText}
              value={titles}
              onChangeText={(text) => setTitle(text || '')}
              placeholder="Title"
              placeholderTextColor="#888"
            />

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
    fontFamily: f.black,
    fontSize: 16,
    color: color.text2,
    letterSpacing: 4,
    marginBottom: 12,
    alignSelf: 'center'
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
});

export default Note;
