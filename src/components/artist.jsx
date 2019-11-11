import React from "react";
import Lottie from "lottie-react-web";
import Social from "./social";
import Play from "./play";
import twitter from "../lottie/twitter";
import facebook from "../lottie/facebook";
import instagram from "../lottie/instagram";
import play from "../lottie/play";
import "../App.scss";

export default class Artist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStopped: true,
      isPaused: false
    };

    this.lottie = React.createRef();
  }

  render() {
    return (
      <div className="container">
        <section className="artist">
          <div className="artist__header"></div>
          <div className="artist__info">
            <div className="artist__block">
              <img
                src="https://images.genius.com/9b28279cfa5bbfee31181d32d6c5901a.750x750x1.jpg"
                alt="Artist"
                className="artist__image"
              />
              <h2 className="artist__name">Architects</h2>
              <ul className="artist__socials">
                <Social data={twitter} isLooped={true} />
                <Social data={facebook} isLooped={true} />
                <Social data={instagram} isLooped={false} />
              </ul>
              <div className="artist__description">
                <p>
                  Architects was formed in Brighton, England in 2005. They are
                  known for their blend of math rock, metalcore, djent, and
                  symphonic metal with sociopolitically charged lyrics. They
                  have released eight studio albums as of 2018’s Holy Hell.
                </p>
                <p>
                  In August 2016, founding member and guitarist Tom Searle
                  passed away from cancer. Drummer Dan Searle posted on Facebook
                  that the future of the band remained uncertain after the
                  conclusion of the All Our Gods… tour.
                </p>
                <p>
                  To pretend that Tom wasn’t at the heart of everything that the
                  band created would be to show a complete lack of respect to
                  the amazing talent that he was. The band will never be the
                  same and there is simply no denying it
                </p>
              </div>
              <iframe
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                title="Clip"
                src="https://www.youtube.com/embed/WqRYBWyvbRo?autoplay=1&mute=1"
                frameBorder="0"
              />
            </div>
            <div className="artist__block">
              <article className="artist__songs">
                <h4>Popular Songs</h4>
                <ul>
                  <li className="song">
                    <Play data={play} />
                    <img
                      src="https://t2.genius.com/unsafe/220x220/https%3A%2F%2Fimages.genius.com%2F24107992fb59cf17720ec63b6677ea95.1000x1000x1.jpg"
                      alt="Song"
                    />
                    <div className="song__info">
                      <h3>Doomsday</h3>
                      <h4>Architects</h4>
                    </div>
                  </li>
                  <li className="song">
                    <Play data={play} />
                    <img
                      src="https://t2.genius.com/unsafe/220x220/https%3A%2F%2Fimages.genius.com%2F50300f39b82906f25d376f7f3ef32551.1000x1000x1.jpg"
                      alt="Song"
                    />
                    <div className="song__info">
                      <h3>Gone with the Wind</h3>
                      <h4>Architects</h4>
                    </div>
                  </li>
                  <li className="song">
                    <Play data={play} />
                    <img
                      src="https://t2.genius.com/unsafe/220x0/https%3A%2F%2Fimages.genius.com%2Fba1d44c4be5036977fcba61bb918572d.1000x1000x1.jpg"
                      alt="Song"
                    />
                    <div className="song__info">
                      <h3>Gravedigger</h3>
                      <h4>Architects</h4>
                    </div>
                  </li>
                </ul>
              </article>
              <article className="artist__albums">
                <h4>Latest Albums</h4>
                <ul>
                  <li className="album">
                    <img
                      src="https://t2.genius.com/unsafe/300x0/https%3A%2F%2Fimages.genius.com%2Ff551b358be75a07ae87fbbff22e1a93f.640x640x1.jpg"
                      alt="Album"
                    />
                    <h3>Spotify Singles</h3>
                    <span>2019</span>
                  </li>
                  <li className="album">
                    <img
                      src="https://images.genius.com/9bfc1be88070994ad4fbe90140f50cdb.300x300x1.jpg"
                      alt="Album"
                    />
                    <h3>Holy Hell</h3>
                    <span>2018</span>
                  </li>
                  <li className="album">
                    <img
                      src="https://t2.genius.com/unsafe/150x0/https%3A%2F%2Fimages.genius.com%2F0e1f84ddb67d4e5fd1fe45e9511206ac.300x300x1.jpg"
                      alt="Album"
                    />
                    <h3>Daybreaker</h3>
                    <span>2012</span>
                  </li>
                  <li className="album">
                    <img
                      src="https://images.genius.com/50300f39b82906f25d376f7f3ef32551.300x300x1.jpg"
                      alt="Album"
                    />
                    <h3>All Our Gods Have Abandoned Us</h3>
                    <span>2016</span>
                  </li>
                  <li className="album">
                    <img
                      src="https://t2.genius.com/unsafe/150x0/https%3A%2F%2Fimages.genius.com%2Fba1d44c4be5036977fcba61bb918572d.300x300x1.jpg"
                      alt="Album"
                    />
                    <h3>Lost Forever // Lost Together</h3>
                    <span>2014</span>
                  </li>
                  <li className="album">
                    <img
                      src="https://t2.genius.com/unsafe/300x0/https%3A%2F%2Fimages.genius.com%2F88247065a75bd0e82f3eba3c8aa79d76.1000x1000x1.jpg"
                      alt="Album"
                    />
                    <h3>The Here and Now</h3>
                    <span>2011</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
