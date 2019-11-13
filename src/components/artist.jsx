import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { actions } from "../store";

import Social from "./social";
import Song from "./song/song";
import Album from "./album";
import Video from "./video";

import twitter from "../lottie/twitter";
import facebook from "../lottie/facebook";
import instagram from "../lottie/instagram";
import play from "../lottie/play";

import "../App.scss";

const socialsMap = {
  twitter: {
    isLooped: true,
    data: twitter
  },
  facebook: {
    isLooped: true,
    data: facebook
  },
  instagram: {
    isLooped: false,
    data: instagram
  }
};

class Artist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: {
        name: "",
        description: "",
        socials: {
          twitter: "",
          facebook: "",
          instagram: ""
        },
        albums: [],
        video: ""
      }
    };

    this.getData();
  }

  onMouseUp = () => {
    this.props.changeDrug(true)
  };

  getData = async () => {
    const response = await axios.get("/api/artist/Architects");
    const data = await response.data;

    this.setState({
      artist: {
        socials: {
          twitter: await data.twitter_name,
          facebook: await data.facebook_name,
          instagram: await data.instagram_name
        },
        name: await data.name,
        description: await data.description,
        image: await data.image,
        headerImage: await data.image_header,
        albums: await data.albums,
        video: await data.video
      }
    });
  };

  render() {
    return (
      <div className="container" onMouseUp={this.onMouseUp}>
        <section className="artist">
          <div
            className="artist__header"
            style={{ backgroundImage: `url(${this.state.artist.headerImage}` }}
          ></div>
          <div className="artist__info">
            <div className="artist__block">
              <img
                src={this.state.artist.image}
                alt="Artist"
                className="artist__image"
              />
              <h2 className="artist__name">{this.state.artist.name}</h2>
              <ul className="artist__socials">
                {Object.entries(this.state.artist.socials).map(
                  ([name, userName]) => {
                    if (!userName) {
                      return "";
                    }

                    return (
                      <Social
                        key={name}
                        data={socialsMap[name].data}
                        isLooped={socialsMap[name].isLooped}
                        link={`https://${name}.com/${userName}`}
                      />
                    );
                  }
                )}
              </ul>
              <div className="artist__description">
                {this.state.artist.description
                  .split("\n\n")
                  .map((item, index) => {
                    return <p key={index}>{item}</p>;
                  })}
              </div>
              {this.state.artist.video && (
                <Video link={this.state.artist.video} />
              )}
            </div>
            <div className="artist__block">
              <article className="artist__songs">
                <h4>Popular Songs</h4>
                <ul>
                  {this.state.artist.albums.slice(0, 3).map(album => (
                    <Song
                      icon={play}
                      key={album.songs[0].name}
                      name={album.songs[0].name}
                      artist={this.state.artist.name}
                      image={album.image}
                      url={album.songs[0].songPlayerUrl}
                    />
                  ))}
                </ul>
              </article>
              <article className="artist__albums">
                <h4>Latest Albums</h4>
                <ul>
                  {this.state.artist.albums.map(album => (
                    <Album
                      key={album.name}
                      name={album.name}
                      date={album.date}
                      image={album.image}
                    />
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isDragged: state.isDragged
});

const mapDispatchToProps = {
  changeDrug: actions.changeDrug
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
