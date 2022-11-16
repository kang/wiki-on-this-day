import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getOtdDate } from './helper';
import styles from './OnThisDay.module.css';
import { fetchOnThisDayNews, selectOnThisDay } from './onThisDaySlice';

export function OnThisDay() {
  const { error, status: otdNewsStatus, value: otdNewsValue } = useAppSelector(selectOnThisDay);
  const [shouldShowErrorModal, setShouldShowErrorModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (otdNewsStatus === 'failed') {
      setShouldShowErrorModal(true);
    } else {
      setShouldShowErrorModal(false);
    }
  }, [otdNewsStatus, error?.stack]);

  const closeErrorModal = () => setShouldShowErrorModal(false);

  const { day, month } = getOtdDate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>On this day - {`${month}/${day}`}</header>
      {otdNewsStatus === 'loading'
        ? <div className={styles.spinner} />
        : <button
          className={styles.button}
          aria-label="Get news from this day"
          onClick={() => dispatch(fetchOnThisDayNews())}
        >
          Get news
        </button>
      }

      {shouldShowErrorModal &&
        <div className={styles.errorModal}>
          <button className={styles.closeErrorModalButton} data-testid="errorCloseButton" onClick={closeErrorModal}>x</button>
          <div className={styles.modalTitle}>Woops, that didn't work</div>
          <div className={styles.errorMessage}>{`${error?.stack}`} </div>
        </div>
      }

      <div className={styles.list}>
        {otdNewsValue?.map(({ text, year }, i) => (
          // not sure if we can use year as the key, using index of news for now
          <li className={styles.listItem} key={i}>{year} - {text}</li>
        ))}
      </div>
    </div>
  );
}
