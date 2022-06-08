import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toNumericFormat } from '../utils'
import styles from './style.module.css'

const TimeTrack = () => {
  const [cookies] = useCookies<any>(['user'])
  const [timeLeft, setTimeLeft] = useState(-1)
  const [lastTimeLeft, setLastTimeLeft] = useState(-1)

  const [timeLeftD, setTimeLeftD] = useState({ value: '-1', status: false })
  const [timeLeftH, setTimeLeftH] = useState({ value: '-1', status: false })
  const [timeLeftM, setTimeLeftM] = useState({ value: '-1', status: false })
  const [timeLeftS, setTimeLeftS] = useState({ value: '-1', status: false })

  const timeLimit = 2 * 24 * 60 * 60

  useEffect(() => {
    const current = Date.now()

    const expir = parseInt(cookies.expiration)

    const tl = timeLimit - Math.floor((current - expir) / 1000)
    setTimeLeft(tl > 0 ? tl : 0)

    // setTimeLeft(timeLimit);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (timeLeft < 0) {
      return
    }

    const Days = Math.floor(timeLeft / 86400)
    const Hours = Math.floor((timeLeft % 86400) / 3600)
    const Minutes = Math.floor((timeLeft % 3600) / 60)
    const Seconds = Math.floor(timeLeft % 60)

    if (Days !== parseInt(timeLeftD.value)) {
      if (timeLeftD.value !== '-1') {
        setTimeLeftD({ value: toNumericFormat(2, Days), status: true })
      } else {
        setTimeLeftD({ value: toNumericFormat(2, Days), status: false })
      }
    }
    if (Hours !== parseInt(timeLeftH.value)) {
      if (timeLeftH.value !== '-1') {
        setTimeLeftH({ value: toNumericFormat(2, Hours), status: true })
      } else {
        setTimeLeftH({ value: toNumericFormat(2, Hours), status: false })
      }
    }
    if (Minutes !== parseInt(timeLeftM.value)) {
      if (timeLeftM.value !== '-1') {
        setTimeLeftM({ value: toNumericFormat(2, Minutes), status: true })
      } else {
        setTimeLeftM({ value: toNumericFormat(2, Minutes), status: false })
      }
    }
    if (Seconds !== parseInt(timeLeftS.value)) {
      if (timeLeftS.value !== '-1') {
        setTimeLeftS({ value: toNumericFormat(2, Seconds), status: true })
      } else {
        setTimeLeftS({ value: toNumericFormat(2, Seconds), status: false })
      }
    }

    if (lastTimeLeft < 0) {
      const intervalId = setInterval(() => {
        setLastTimeLeft(timeLeft)
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
        if (timeLeft < 1) {
          clearInterval(intervalId)
        }
      }, 1000)
    }

    setTimeout(() => {
      setTimeLeftD({ value: toNumericFormat(2, Days), status: false })
      setTimeLeftH({ value: toNumericFormat(2, Hours), status: false })
      setTimeLeftM({ value: toNumericFormat(2, Minutes), status: false })
      setTimeLeftS({ value: toNumericFormat(2, Seconds), status: false })
    }, 500)

    // eslint-disable-next-line
  }, [timeLeft])

  return (
    <>
      <label className={styles.timeSpan}>
        <label className={`${styles.timeCounter} ${timeLeftD.status && styles.animation}`}>
          <label className={styles.timeDisplay}>{timeLeftD.value}</label>
          <label className={`${styles.timeCurrent} ${styles.timeAnimation}`}>{timeLeftD.value}</label>
          <label className={`${styles.timePreview} ${styles.timeAnimation}`}>{timeLeftD.value}</label>
        </label>
        D
      </label>
      <label className={styles.timeSpan}>
        <label className={`${styles.timeCounter} ${timeLeftH.status && styles.animation}`}>
          <label className={styles.timeDisplay}>{timeLeftH.value}</label>
          <label className={`${styles.timeCurrent} ${styles.timeAnimation}`}>{timeLeftH.value}</label>
          <label className={`${styles.timePreview} ${styles.timeAnimation}`}>{timeLeftH.value}</label>
        </label>
        H
      </label>
      <label className={styles.timeSpan}>
        <label className={`${styles.timeCounter} ${timeLeftM.status && styles.animation}`}>
          <label className={styles.timeDisplay}>{timeLeftM.value}</label>
          <label className={`${styles.timeCurrent} ${styles.timeAnimation}`}>{timeLeftM.value}</label>
          <label className={`${styles.timePreview} ${styles.timeAnimation}`}>{timeLeftM.value}</label>
        </label>
        M
      </label>
      <label className={styles.timeSpan}>
        <label className={`${styles.timeCounter} ${timeLeftS.status && styles.animation}`}>
          <label className={styles.timeDisplay}>{timeLeftS.value}</label>
          <label className={`${styles.timeCurrent} ${styles.timeAnimation}`}>{timeLeftS.value}</label>
          <label className={`${styles.timePreview} ${styles.timeAnimation}`}>{timeLeftS.value}</label>
        </label>
        S
      </label>
    </>
  )
}
export default React.memo(TimeTrack)
