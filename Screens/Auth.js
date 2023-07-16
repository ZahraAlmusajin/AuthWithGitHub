import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Alert, Button, View, StyleSheet, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import Logo from '../Components/Logo';
WebBrowser.maybeCompleteAuthSession();

const Auth = ({ navigation }) => {
  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/ee653353d29746053fa5',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'ee653353d29746053fa5',
      scopes: ['identity', 'user', 'repo'],
      redirectUri: makeRedirectUri({ scheme: 'exp://192.168.100.30:19001/--/*' }),
    },
    discovery
  );

  React.useEffect(() => {
    const getResponse = async () => {
      try {
        if (response?.type === 'success') {

          const { code } = response.params;

          const res = await axios.post('http://192.168.100.30:5001/my-api-de05b/us-central1/gitGithubToken', {
            code: code,
          });

          const accessToken = res.data;
          console.log(res.data);
          await AsyncStorage.setItem("access_token", accessToken);
          navigation.navigate("Profile")

        } else if (response?.type === "error") {
          Alert.alert("error", response?.error?.message);
        }
      } catch (error) {
        Alert.alert("error", error?.message);
      }
    }
    getResponse()
  }, [response]);


  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.button}>
        <Button color='#DD7B88'
          disabled={!request}
          title="Login with GitHub"
          onPress={() => promptAsync()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EDEB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  button: {
    backgroundColor: '#F9DCC4',
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    padding: 10
  }
});
export default Auth;