import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import { InsertEmoticon, InsertEmoticonOutlined } from "@mui/icons-material";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState(new Map());
  const [finalResult, setFinalResult] = useState(0);
  const [isFinishQuis, setIsFinishQuiz] = useState(false);

  useEffect(() => {
    getQuizData();
  }, [true]);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getQuizData = () => {
    //const axios = require('axios'); // legacy way
    // Make a request for a user with a given ID
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
      )
      .then(function (response, index) {
        // handle success
        const data = [];
        response.data["results"].forEach((item, index) => {
          let answers = item.incorrect_answers;
          answers.push(item.correct_answer);
          item.answers = shuffle(answers);
          item.id = `que_${index}`;
          data.push(item);
        });
        setQuizData(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const onCalculateResult = () => {
    let result = 0;
    quizData.forEach((que) => {
      if (userAnswers.get(que.id) === que.correct_answer) {
        result = result + 1;
      }
    });
    setFinalResult(result);
    setIsFinishQuiz(true);
  };

  return (
    <div className="quizContainer">
      <div className="" style={{ background: "black" }}>
        1
      </div>

      {isFinishQuis ? (
        // <SnackBar open={isFinishQuis}>{finalResult}</SnackBar>
        <>
          <div style={{ background: "white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
            <marquee style={{width:"60%"}}>

            <Typography variant="h2" color="green">Congratulations!!!</Typography>
            </marquee>
            <Typography variant="h3">You won {finalResult} crore</Typography>
            <Button
              variant="contained"
              onClick={() => {
                window.location.reload();
              }}
            >
              Play again
            </Button>
          </div>
        </>
      ) : (
        <div className="">
          {quizData.map((item, index) => (
            <div className="questionBar" key={index}>
              <div className="quesTitle">{item.question}</div>
              <div className="answerContainer">
                {item.incorrect_answers.map((ans, index) => (
                  // <Button>{ans}</Button>
                  <Button
                    key={index}
                    onClick={() => {
                      userAnswers.set(item.id, ans);
                      setUserAnswers(new Map(userAnswers));
                    }}
                    variant="contained"
                    style={{
                      background:
                        userAnswers.get(item.id) === ans ? "green" : "navy",
                    }}
                  >
                    {ans}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={() => onCalculateResult()}>Submit</Button>
        </div>
      )}

      <div className="" style={{ background: "black" }}>
        3
      </div>
    </div>
  );
}

export default App;
