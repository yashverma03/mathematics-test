import React from 'react';
import styles from './Submit.module.css';
import { useAppContext } from '../../utils/AppContext';

const Submit = () => {
  const { name, selectedQuestions, questionTime } = useAppContext();

  const totalTimeTaken = questionTime.reduce((total, time) => total + time, 0);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minutesDisplay = minutes > 0 ? `${minutes} min` : '';
    const secondsDisplay = `${remainingSeconds} sec`;

    return `${minutesDisplay} ${secondsDisplay}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Test Summary</h2>

      <div className={styles.summary}>
        <div className={styles.summaryItems}>
          <p>
            <span className={styles.summaryItem}>Total time taken: </span>
            {formatTime(totalTimeTaken)}
          </p>
          <p>
            <span className={styles.summaryItem}>Name: </span>
            {name}
          </p>
        </div>

        <ul className={styles.list}>
          <li className={styles.listHeading}>
            <span className={styles.questionId}>QuestionId</span>
            <span className={styles.timeTaken}>Time taken (seconds)</span>
          </li>

          {selectedQuestions.map((questionId, index) => (
            <li className={styles.listItem} key={questionId}>
              <span className={styles.questionId}>{questionId}</span>
              <span className={styles.timeTaken}>{formatTime(questionTime[index])}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Submit;
