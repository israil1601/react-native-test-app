import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import YouTube from 'react-native-youtube';
import PlayList from './components/playlist';
import channels from './channels';
import Header from './components/Header';

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
      <ScrollView>
        {channels.map(item => {
          return (
            <PlayList
              id={item.id}
              icon={item.icon}
              name={item.name}
              changePlaylist={changePlaylist}
              key={item.id}
              length={currentPlaylist.length}
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
});

export default App;
