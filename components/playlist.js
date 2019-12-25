import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Button} from 'react-native-elements';
const Playlist = props => {
  return (
    <Card
      title={props.name}
      image={{uri: props.icon}}
      imageProps={{resizeMode: 'contain'}}>
      <Button
        title="View"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        type="outline"
        onPress={() => {
          props.changePlaylist(props.id);
        }}
        disabled={props.id === props.currentChannelId}
        TouchableComponent={TouchableOpacity}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderColor: '#000000FF',
  },
  titleStyle: {
    color: '#000000FF',
  },
});

export default Playlist;
