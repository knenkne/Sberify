import React from 'react';
import Lottie from 'lottie-react-web';
import twitter from '../lottie/twitter.json';
import '../App.css';

export default class Artist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="container">
                <section className="artist">
                    <div className="artist__header"></div>
                    <div className="artist__info">
                        <div className="artist__block">
                            <img src="https://images.genius.com/9b28279cfa5bbfee31181d32d6c5901a.750x750x1.jpg" alt="Artist" className="artist__image" />
                            <h2 className="artist__name">Architects</h2>
                            <ul className="artist__socials">
                                <li className="artist__twitter">
                                    <Lottie options={{ animationData: twitter, loop: true }} />
                                </li>
                                <li className="artist__facebook"></li>
                                <li className="artist__instagram"></li>
                            </ul>
                            <div className="artist__description">
                                <p>Architects was formed in Brighton, England in 2005. They are known for their blend of math rock, metalcore, djent, and symphonic metal with sociopolitically charged lyrics. They have released eight studio albums as of 2018’s Holy Hell.</p>
                                <p> In August 2016, founding member and guitarist Tom Searle passed away from cancer. Drummer Dan Searle posted on Facebook that the future of the band remained uncertain after the conclusion of the All Our Gods… tour.</p>
                                <p>To pretend that Tom wasn’t at the heart of everything that the band created would be to show a complete lack of respect to the amazing talent that he was. The band will never be the same and there is simply no denying it</p>
                            </div>
                        </div>
                        <div className="artist__block">
                            12312312312312
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}