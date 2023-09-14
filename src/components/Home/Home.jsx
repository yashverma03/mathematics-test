import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import questionId from '../../config/data';
import { useAppContext } from '../../utils/AppContext';

const Home = () => {
  const { name, setName, selectedQuestions, setSelectedQuestions, totalTime, setTotalTime } = useAppContext();

  useEffect(() => {
    const newTotalTime = selectedQuestions.length * 5;
    setTotalTime(newTotalTime);
  }, [selectedQuestions]);

  const handleQuestionCheckboxChange = (event, question) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== question));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Name:', name);
    console.log('Selected Questions:', selectedQuestions);
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.heading}>Mathematics Test</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formName'>
          <Form.Label className={styles.label}>Your Name</Form.Label>
          <Form.Control
            className={styles.input}
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className={styles.label}>Select Questions</Form.Label>
          <Row className={styles.row}>
            {Object.keys(questionId).map((key) => (
              <Col key={key} sm={6} className={styles.col}>
                <Form.Check
                  type='checkbox'
                  label={questionId[key]}
                  id={`question_${key}`}
                  onChange={(e) => handleQuestionCheckboxChange(e, questionId[key])}
                />
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Form.Group controlId='formTotalTime'>
          <Form.Label className={styles.label}>Total Time (minutes)</Form.Label>
          <Form.Control
            className={styles.input}
            type='number'
            value={totalTime}
            readOnly
          />
        </Form.Group>

        <Button className={styles.button} variant='primary' type='submit'>
          Go to Test
        </Button>
      </Form>
    </Container>
  );
};

export default Home;
