import React, { Component } from "react";

import Progress from "../components/Progress";
import Box from "@mui/material/Box";
import axios from "axios";
import swal from "sweetalert2";

export default class Practice extends Component {
    state = {
        questions: [],
        loading: true,
        questions: this.props.questions,
        currentQuestionIndex: 0,
        correctAnswersCount: 0,
        progress: 0,
    };

    componentDidMount() {
        // get the wordList array from the server
        axios
            .get("/api/getWordList")
            .then((success) => {
                // assign it to questions
                this.setState({ questions: success.data, loading: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // handling radio buttons selections
    handleSelect = (e, question, index) => {
        // if statement to see if the selected radio button is equal to the correct answer
        if (e.target.value === question.pos) {
            swal.fire("Correct Answer", "", "success");
            this.setState({
                correctAnswersCount: this.state.correctAnswersCount + 1,
                progress: this.state.progress + 10,
            });
            this.showNextQuestion();
        } else {
            swal.fire("Wrong Answer", "", "error");
            this.setState({
                progress: this.state.progress + 10,
            });
            this.showNextQuestion();
        }
        // when reaching the last question, navigate to result page
        if (index >= this.state.questions.length - 1) {
            // get the finalScore to send to the server to get back the rank
            let finalScore = { finalScore: (this.state.correctAnswersCount / this.state.questions.length) * 100 };
            axios
                .post("/api/rank", finalScore)
                .then((result) => {
                    // navigate to the result page and passing the rank to it
                    let rank = parseFloat(result.data.rank).toFixed(2);
                    this.props.history.push(`/result/${rank}`);
                })
                .catch((error) => console.log(error));
        }
    };

    // function to show the next question
    showNextQuestion = () => {
        // assign currentQuestion index to the previous index plus 1 (+1)
        this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1 });
    };

    render() {
        return (
            <div>
                {this.state.loading ? (
                    "Loading..."
                ) : (
                    <div>
                        <Box sx={{ width: "100%", marginTop: "20px" }}>
                            <div>
                                <Progress value={this.state.progress} />
                            </div>
                        </Box>
                        {this.state.questions.map((question, index) => (
                            <div
                                className="card mt-2"
                                key={index}
                                style={{ display: index === this.state.currentQuestionIndex ? "block" : "none" }}
                            >
                                <div className="card-header">
                                    {question.id}. Word is "{question.word}"
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-3">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name={question.word}
                                                    id={"verb" + index}
                                                    value="verb"
                                                    onChange={(e) => this.handleSelect(e, question, index)}
                                                />
                                                <label className="form-check-label" htmlFor={"verb" + index}>
                                                    verb
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-3">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    name={question.word}
                                                    className="form-check-input"
                                                    type="radio"
                                                    id={"noun" + index}
                                                    onChange={(e) => this.handleSelect(e, question, index)}
                                                    value="noun"
                                                />
                                                <label className="form-check-label" htmlFor={"noun" + index}>
                                                    noun
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-3">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    name={question.word}
                                                    type="radio"
                                                    id={"adjective" + index}
                                                    onChange={(e) => this.handleSelect(e, question, index)}
                                                    value="adjective"
                                                />
                                                <label className="form-check-label" htmlFor={"adjective" + index}>
                                                    adjective
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-3">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    name={question.word}
                                                    type="radio"
                                                    id={"adverb" + index}
                                                    onChange={(e) => this.handleSelect(e, question, index)}
                                                    value="adverb"
                                                />
                                                <label className="form-check-label" htmlFor={"adverb" + index}>
                                                    adverb
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
