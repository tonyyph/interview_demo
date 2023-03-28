import {useNavigation} from '@react-navigation/native';
import * as firebase from 'firebase';
import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const RegisterScreen = () => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const [layouts, setLayout] = useState(null);
  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({
      headerShown: false,
    });
  });

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authenticate => {
        return authenticate.user.updateProfile({
          displayName: name,
        });
      })
      .catch(err => setErrorMessage(err.message));
  };

  const renderSignIn = () => {
    return (
      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: 32}}
        onPress={() => navigator.navigate('Login')}>
        <Text style={{fontSize: 14, color: '#FFF'}}>
          {`Already have account ? `}
          <Text style={{color: '#5cdbd3', fontWeight: '600'}}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  const renderInputSection = () => {
    return (
      <View style={styles.form}>
        <View>
          <Text style={styles.textInput}> Full Name</Text>
          <TextInput
            style={[styles.input]}
            onChangeText={name => setName(name)}
            value={name}
            autoCapitalize="none"
          />
        </View>
        <View style={{marginTop: 32}}>
          <Text style={[styles.textInput]}>Email Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={email => setEmail(email)}
            value={email}
            autoCapitalize="none"
          />
        </View>

        <View style={{marginTop: 32}}>
          <Text style={styles.textInput}> Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={password => setPassword(password)}
            value={password}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.logoView}>
          <View onLayout={({nativeEvent}) => setLayout(nativeEvent?.layout)}>
            {layouts && (
              <Image
                source={require('../assets/card_welcome_2.png')}
                style={[
                  styles.cardImg1,
                  {width: layouts.width, height: layouts.height},
                ]}
                resizeMode="contain"
              />
            )}
            <Image source={require('../assets/card_welcome_1.png')} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <ImageBackground
      source={require('../assets/bg_welcome.png')}
      style={[styles.container, {paddingTop: insets.top}]}>
      {renderHeader()}
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      {renderInputSection()}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{'Sign up'}</Text>
      </TouchableOpacity>
      {renderSignIn()}
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  greeting: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#f5222d',
    fontSize: 15,
    fontWeight: '500',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  textInput: {
    color: '#fff0f6',
    fontSize: 12,
    textTransform: 'uppercase',
    backgroundColor: '#363636',
    zIndex: 100,
    position: 'absolute',
    top: -10,
    paddingHorizontal: 4,
    left: 8,
  },
  input: {
    borderColor: '#fff0f6',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 17,
    color: '#fff0f6',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#5cdbd3',
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#00474f',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textDesc: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 30,
  },
  wrapText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 100,
    marginTop: 40,
  },
  cardImg1: {
    position: 'absolute',
    zIndex: 2,
    bottom: 30,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
