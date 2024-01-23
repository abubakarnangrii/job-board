import React from 'react'
import styles from './JobPosting.module.css'

function JobPosting({url , title,by , time}) {
    const formattedTime = new Date(time*1000).toLocaleString();
  return (
    <div className={styles.post} role='listitem'>
        <h2 className={styles.post__title}>
            <a className={url ? styles.a : styles.inactiveLink} 
            href={url}
            rel='noopener'
            >{title}3534</a>
        </h2>
        <span className={styles.post__metadata}>By {by} - {formattedTime}</span>
    </div>
  )
}

export default JobPosting;
