import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = ' AIzaSyCs_sQLyN30p_l-8_IPZGbEE1PhlszE8ZM ';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.searchYouTube('A_Seagull');
  }

  searchYouTube(term) {
    YTSearch({ key: API_KEY, term: term }, videos =>
      this.setState({
        videos,
        selectedVideo: videos[0]
      })
    );
  }

  render() {
    const searchYouTube = _.debounce(term => {
      this.searchYouTube(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearch={searchYouTube} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
