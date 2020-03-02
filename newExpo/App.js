import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends React.Component {
constructor(props){
  super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null
    };

  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null
      });
    },
    error => this.setState({error: error.message}),
    {enableHighAccuracy:true,timeout:2000, maximumAge:2000}
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
        region = {{
          latitude: this.state.latitude,
          longitude : this.state.longitude,
          
        }} >
    <Marker coordinate = {this.state}/>
   </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

// jest.mock('react-native-maps', () => {
//   const { View } = require('react-native');
//   const MockMapView = (props: any) => {
//     return <View>{props.children}</View>;
//   };
//   const MockMarker = (props: any) => {
//     return <View>{props.children}</View>;
//   };
//   return {
//     __esModule: true,
//     default: MockMapView,
//     Marker: MockMarker,
//   };
// });