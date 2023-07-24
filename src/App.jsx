import { Button } from "@mui/material";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import { InsertEmoticon, InsertEmoticonOutlined } from "@mui/icons-material";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState(new Map());

  useEffect(() => {
    getQuizData();
  }, [true]);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  const getQuizData = () => {
    //const axios = require('axios'); // legacy way
    // Make a request for a user with a given ID
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
      )
      .then(function (response,index) {
        // handle success
        const data = [];
        response.data["results"].forEach((item,index) => {
          let answers = item.incorrect_answers;
          answers.push(item.correct_answer);
          item.answers = shuffle(answers);
          item.id = `que_${index}`
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

  return (
    <div className="quizContainer">
      <div className="" style={{ background: "black" }}>
        1
      </div>

      <div className="">
        {quizData.map((item,index) => (
          <div className="questionBar" key={index}>
            <div className="quesTitle">{item.question}</div>
            <div className="answerContainer">
              {item.incorrect_answers.map((ans,index) => (
                // <Button>{ans}</Button>
                <Button key={index} onClick={()=>{
                  userAnswers.set(item.id,ans);
                  setUserAnswers(new Map(userAnswers));
                }} variant="contained" style={{background:userAnswers.get(item.id)===ans?'green':'navy'}}>{ans}</Button>
              ))}
            </div>
          </div>
          // <Button></Button>
        ))}
      </div>

      <div className="" style={{ background: "black" }}>
        3
      </div>
    </div>
  );
}

export default App;