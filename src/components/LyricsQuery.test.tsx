import React from 'react';
import ReactDOM from 'react-dom';
import LyricsQuery from './LyricsQuery';
import { shallow } from 'enzyme';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LyricsQuery />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('has Nirvana as a default band name', () => {
    var query = new LyricsQuery({});
    expect(query.band()).toBe('Nirvana');
});

it('has Smell Like Teen Spirit as a default song name', () => {
    var query = new LyricsQuery({});
    expect(query.song()).toBe('Smell Like Teen Spirit');
});

it('should update the band value when there is a change', () => {
    LyricsQuery.prototype.handleBandChange = jest.fn();
    let wrapper = shallow(<LyricsQuery />);
    wrapper.find('#band-name').simulate('change');
    expect(LyricsQuery.prototype.handleBandChange).toBeCalled();
});

it('should update the song value when there is a change', () => {
    LyricsQuery.prototype.handleSongChange = jest.fn();
    let wrapper = shallow(<LyricsQuery />);
    wrapper.find('#song-name').simulate('change');
    expect(LyricsQuery.prototype.handleSongChange).toBeCalled();
});

it('should call the API when user is submitting the form', () => {
    LyricsQuery.prototype.getLyrics = jest.fn();
    let wrapper = shallow(<LyricsQuery />);
    wrapper.find('#submit-for-lyrics').simulate('click');
    expect(LyricsQuery.prototype.getLyrics).toBeCalled();
});