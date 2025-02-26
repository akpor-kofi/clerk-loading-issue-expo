import {isClerkRuntimeError, useSignIn, useSSO} from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import {Text, TextInput, Button, View, Pressable} from 'react-native';
import React from 'react';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
    const { startSSOFlow } = useSSO();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
        if (isClerkRuntimeError(err) && err.code === 'network_error') {
            console.error('Network error occurred!')
        }
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

        <Pressable onPress={async () => {
            try {
                const {createdSessionId, setActive} = await startSSOFlow({
                    strategy: 'oauth_google',
                })

                if (createdSessionId) {
                    setActive!({ session: createdSessionId });
                } else {
                    // TODO: handle this with signIn/signUp later
                }
            } catch (err) {
                console.error(err);
            }

        }}>
            <Text>google</Text>
        </Pressable>
      <Button title="Sign in" onPress={onSignInPress} />
      <View>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
