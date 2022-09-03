import { React, Component } from "react";

export default class Result extends Component {
    constructor(props) {
        super(props);
    }
    // navigate back to practice page when button clicked
    handleClick() {
        this.props.history.push("/");
    }
    render() {
        // get the rank from the URL
        const { rank } = this.props.match.params;
        return (
            <div>
                {/* show the rank  */}
                Your practice result is {rank}%
                <button
                    className="btn btn-primary m-2"
                    onClick={() => {
                        this.handleClick();
                    }}
                >
                    Practice Again
                </button>
            </div>
        );
    }
}
