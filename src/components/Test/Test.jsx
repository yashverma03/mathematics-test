import React, { useEffect, useState } from 'react';
import styles from './Test.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import apiUrl from '../../config/api';
import { useAppContext } from '../../utils/AppContext';

const Test = () => {
  // const { globalTimer, questionTime, setQuestionTime } = useAppContext();
  const { selectedQuestions, globalTimer, questionTime, setQuestionTime } = useAppContext();

  // dummy data
  // const selectedQuestions = [
  //   'AreaUnderTheCurve_21',
  //   'BinomialTheorem_13',
  //   'BinomialTheorem_24',
  //   'AreaUnderTheCurve_15',
  //   'AreaUnderTheCurve_2',
  //   // 'BinomialTheorem_3',
  //   // 'BinomialTheorem_4',
  //   // 'AreaUnderTheCurve_5',
  // ];

  const { index } = useParams();
  const id = selectedQuestions[index];

  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [currentIndex, setCurrentIndex] = useState(Number(index));
  const [questionTimer, setQuestionTimer] = useState(Date.now());

  const updateElapsedTime = () => {
    const elapsedSeconds = Math.floor((Date.now() - questionTimer) / 1000); 
    const updatedQuestionTime = [...questionTime];
    updatedQuestionTime[currentIndex] += elapsedSeconds; 
    setQuestionTime(updatedQuestionTime); 
    setQuestionTimer(Date.now()); 
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${apiUrl}?QuestionID=${id}`);
        const questionData = response.data[0];
        setQuestion(questionData.Question);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();

    const currentIndex = Number(index);

    if (!isNaN(currentIndex) && currentIndex >= 0 && currentIndex < selectedQuestions.length) {
      setCurrentIndex(currentIndex);
    }
  }, [id, selectedQuestions, index]);

  const handleNextClick = () => {
    if (currentIndex < selectedQuestions.length - 1) {
      updateElapsedTime();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      navigate(`/test/${currentIndex + 1}`);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      updateElapsedTime();
      setCurrentIndex((prevIndex) => prevIndex - 1);
      navigate(`/test/${currentIndex - 1}`);
    }
  };

  const handleSubmitClick = () => {
    updateElapsedTime();
    navigate('/submit');
  };

  // useEffect(() => {
  //   console.log('questionTime', questionTime);
  // }, [questionTime]);

  const minutes = Math.floor(globalTimer / 60);
  const seconds = globalTimer % 60;

  return (
    <div className={styles.container}>
      <p className={styles.timer}>Timer: {minutes} min {seconds} sec</p>

      <h2 className={styles.heading}>Question {currentIndex + 1}</h2>
      <p className={styles.question}>{question}</p>

      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>

        <Button
          className={styles.button}
          onClick={handleNextClick}
          disabled={currentIndex === selectedQuestions.length - 1}
        >
          Next
        </Button>
      </div>

      <div className={styles.submitButton}>
        <Button
          variant='danger'
          onClick={handleSubmitClick}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Test;
