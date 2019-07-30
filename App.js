// import * as React from 'react';
// import { Text, View, StyleSheet, Button } from 'react-native';
// import { Constants, Permissions, BarCodeScanner } from 'expo';

// export default class BarcodeScannerExample extends React.Component {
//   state = {
//     hasCameraPermission: null,
//     scanned: false,
//     data: null,
//     type: null,
//   };

//   async componentDidMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' });
//   }

//   render() {
//     const { hasCameraPermission, scanned } = this.state;

//     if (hasCameraPermission === null) {
//       return <Text>Requesting for camera permission</Text>;
//     }
//     if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     }
//     return (
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'column',
//           justifyContent: 'center',
//         }}>
//         <View
//           style={{
//             flex: 0.1,
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center'
//           }}>
//           <Text style={{
//             fontSize: 20,
//             fontWeight: 'bold',
//           }}>
//             Scan BarCode
//           </Text>
//         </View>

//         <BarCodeScanner
//           onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
//           style={{
//             flex: 0.6,
//             flexDirection: 'column',
//             justifyContent: 'center'
//           }}
//         />
//         <View
//           style={{
//             flex: 0.8,
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center'
//           }}>
//           <Button
//             style={{
//               flex: 0.5,
//             }}
//             title={'Tap to Scan Again'}
//             onPress={() => this.setState({ scanned: false })}
//           />
//           {
//             scanned ?
//               <View
//                 style={{
//                   flex: 0.5,
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}>
//                 <Text style={{
//                   fontSize: 20,
//                 }}>
//                   Data: {this.state.data}
//                 </Text>
//                 <Text style={{
//                   fontSize: 20,
//                 }}>
//                   Type: {this.state.type}
//                 </Text>
//               </View>
//               : null
//           }
//         </View>
//       </View>
//     );
//   }

//   handleBarCodeScanned = ({ type, data }) => {
//     this.setState({ scanned: true });
//     this.setState({ data: data });
//     this.setState({ type: type });
//   };
// }
import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import Expo from "expo"
import { Google } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
    }
  }
  signIn = async () => {
    try {
      // const result = await Expo.Google.logInAsync({
      //   androidClientId:
      //     "538584680383-bd9oolmgh81qa4k9r701bqrkfvbdduf1.apps.googleusercontent.com",
      //   //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
      //   // iosClientId:
      //   // "207366445155-pf925c4d1ck5jd4v6nau1ac9a0budl7g.apps.googleusercontent.com",
      //   // scopes: ["profile", "email"]
      // })

      const { type, accessToken, user } = await Google.logInAsync({clientId: "207366445155-pf925c4d1ck5jd4v6nau1ac9a0budl7g.apps.googleusercontent.com"});

        if (type === 'success') {
          /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
          this.setState({
            signedIn: true,
            name: user.name
          })
        } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})