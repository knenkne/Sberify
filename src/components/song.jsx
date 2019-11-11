import React from "react";
import Play from "./play";
import "../App.scss";

export default class Song extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <li className="song">
                <Play data={this.props.icon} />
                <img
                    src={this.props.image}
                    alt={this.props.name}
                />
                <div className="song__info">
                    <h3>{this.props.name}</h3>
                    <h4>{this.props.artist}</h4>
                </div>
            </li>
        );
    }
}
