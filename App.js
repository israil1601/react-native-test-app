import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableHighlight} from 'react-native';
import YouTube from 'react-native-youtube';
import PlayList from './components/playlist';
import channels from './channels';
import Header from './components/Header';
import {Button} from 'react-native-elements';

const App = () => {
  const [currentPlaylist, setPlaylist] = useState(channels[0].playlist);
  const [lastPlayedVideoIndex, setLastPlayedVideoIndex] = useState(
    channels.reduce((acc, curr) => {
      acc[curr.id] = 0;
      return acc;
    }, {}), // last played video indeces of all channels: {[channel Id]: [last played video Id]}
  );
  const [currentChannelId, setCurrentChannelId] = useState(channels[0].id);
  const [currentVideo, setCurrentVideo] = useState(currentPlaylist[0]);
  const [nextVideoId, setnextVideoId] = useState(1);
  const changePlaylist = id => {
    const newPlaylist = channels.find(item => item.id === id).playlist;
    setPlaylist(newPlaylist);
    setCurrentVideo(newPlaylist[lastPlayedVideoIndex[id]]);
    setCurrentChannelId(id);
  };

  const nextVideoHandler = () => {
    if (nextVideoId < currentPlaylist.length) {
      setCurrentVideo(currentPlaylist[nextVideoId]);
      setnextVideoId(nextVideoId + 1);
      setLastPlayedVideoIndex({
        ...lastPlayedVideoIndex,
        [currentChannelId]: lastPlayedVideoIndex[currentChannelId] + 1,
      });
    } else {
      setCurrentVideo(currentPlaylist[0]);
      setnextVideoId(1);
      setLastPlayedVideoIndex({
        ...lastPlayedVideoIndex,
        [currentChannelId]: 0,
      });
    }
  };

  const previousVideoHandler = () => {
    if (lastPlayedVideoIndex[currentChannelId] === 0) {
      // if first video, move to last video
      const previousVideo = currentPlaylist[currentPlaylist.length - 1]; // last video
      setCurrentVideo(previousVideo);
      setnextVideoId(currentPlaylist.length);
      setLastPlayedVideoIndex({
        ...lastPlayedVideoIndex,
        [currentChannelId]: currentPlaylist.length - 1,
      });
    } else {
      setCurrentVideo(
        currentPlaylist[lastPlayedVideoIndex[currentChannelId] - 1],
      );
      setnextVideoId(nextVideoId - 1);
      setLastPlayedVideoIndex({
        ...lastPlayedVideoIndex,
        [currentChannelId]: lastPlayedVideoIndex[currentChannelId] - 1,
      });
    }
  };

  return (
    <View style={styles.screen}>
      <Header />
      <YouTube
        videoId={currentVideo}
        apiKey="AIzaSyCnC9SGNO4zNvWxRiZ1ZmAXM2BMcTQ3eMs"
        play={true}
        style={styles.video}
        onChangeState={e => {
          if (e.state === 'ended') {
            nextVideoHandler();
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Previous Video"
          onPress={previousVideoHandler}
          type="outline"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          TouchableComponent={TouchableHighlight}
        />
        <Button
          title="Next Video"
          onPress={nextVideoHandler}
          type="outline"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          TouchableComponent={TouchableHighlight}
        />
      </View>
      <ScrollView>
        {channels.map(item => {
          return (
            <PlayList
              id={item.id}
              icon={item.icon}
              name={item.name}
              changePlaylist={changePlaylist}
              key={item.id}
              currentChannelId={currentChannelId}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000FF',
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    justifyContent: 'space-around',
  },
  buttonStyle: {
    margin: 10,
    borderColor: 'white',
  },
  titleStyle: {
    color: 'white',
  },
});

export default App;
