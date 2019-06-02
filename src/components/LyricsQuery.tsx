import React, {FormEvent} from 'react';
import ReactLoading from 'react-loading';
import Modal from 'react-modal';
import axios from 'axios';
import './LyricsQuery.css';

const URL: string = 'https://api.lyrics.ovh/v1/';

interface Props {}

interface State {
    band: string,
    song: string,
    lyrics: string,
    modalOpened: boolean,
    loading: boolean
}

export default class LyricsQuery extends React.Component<{}, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            band: 'Nirvana',
            song: 'Smell Like Teen Spirit',
            lyrics: '',
            modalOpened: false,
            loading: false
        };

        this.handleBandChange = this.handleBandChange.bind(this);
        this.handleSongChange = this.handleSongChange.bind(this);
        this.getLyrics = this.getLyrics.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    band() {
        return this.state.band;
    }

    song() {
        return this.state.song;
    }

    handleBandChange(event: FormEvent<HTMLInputElement>) {
        this.setState(
            {
                band: event.currentTarget.value
            }
        );
    }

    handleSongChange(event: FormEvent<HTMLInputElement>) {
        this.setState(
            {
                song: event.currentTarget.value
            }
        );
    }

    openModal() {
        this.setState(
            {
                modalOpened: true
            }
        );
    }

    closeModal() {
        this.setState(
            {
                modalOpened: false
            }
        );
    }

    async getLyrics(event: FormEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState(
            {
                loading: true
            });
        let request: string = URL + this.state.band + '/' + this.state.song
        await axios.get(request)
        .then(response => {
            this.setState(
                {
                    modalOpened: false, 
                    lyrics: response.data.lyrics,
                    loading: false
                });
        })
        .catch(error => {
            this.setState(
                {
                    modalOpened: false, 
                    lyrics: 'Lyrics not found for provided artist and song.',
                    loading: false
                });
        })
        .then( () =>
            this.openModal()
        );
    }

    render() {
        const loading = this.state.loading;
        let spinner;

        if (loading) {
            spinner = <ReactLoading className="loading-icon" type="spin" color="#000"></ReactLoading>
        }

        return (
            <div className="LyricsQuery">
                <form>
                    <div className="band-info">
                        <label>
                            Band name: 
                            <input id="band-name" type="text" value={this.state.band} onChange={this.handleBandChange} />
                        </label>
                    </div>
                    <div className="song-info">
                        <label>
                            Song title: 
                            <input id="song-name" type="text" value={this.state.song} onChange={this.handleSongChange} />
                        </label>
                    </div>
                    <input id="submit-for-lyrics" type="submit" value="Search Lyrics" onClick={this.getLyrics}/>
                </form>
                {spinner}
                <Modal
                    isOpen={this.state.modalOpened}
                    onRequestClose={this.closeModal}
                    contentLabel="Lyrics">
                    <div className="lyrics">
                        <pre>{this.state.lyrics}</pre>
                    </div>
                    <button className="modal-close-button" onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        );
    }
}