import React from 'react';
import {Card, Button} from 'react-native-elements';
const Playlist = props => {
  return (
    <Card
      title={props.name}
      image={{uri: props.icon}}
      imageProps={{resizeMode: 'contain'}}>
      <Button
        title="View"
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          backgroundColor: '#000000FF',
        }}
        onPress={() => {
          props.changePlaylist(props.id);
        }}
      />
    </Card>
  );
};

export default Playlist;
