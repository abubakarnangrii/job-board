import React, { useEffect, useState } from 'react';
import JobPosting from '../JobPosting/JobPosting'
import styles from './JobBoard.module.css'


const API_ENDPOINT = `https://hacker-news.firebaseio.com/v0`
const ITEM_PER_PAGE =6;


function JobBoard(props) {
    const [items, setItems] = useState([]);
    const [itemsIds, setItemsIds] = useState(null);
    const [fetchingDetails, setFetchingDetails] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchItems = async (currPage) => {
        setCurrentPage(currPage);
        setFetchingDetails(true);

        let itemsList = itemsIds;
        if (itemsList === null) {
            const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
            itemsList = await response.json();
            setItemsIds(itemsList);
        }

        const itemIdsForPage = itemsList.slice(
            currPage*ITEM_PER_PAGE,
            currPage*ITEM_PER_PAGE+ITEM_PER_PAGE
        );

        const itemsForPage = await Promise.all(
            itemIdsForPage.map((itemId) => {
                return fetch(`${API_ENDPOINT}/item/${itemId}.json`).then(res => res.json());
            })
        )
        setItems([...items, ...itemsForPage]);
        setFetchingDetails(false);
    }

    useEffect(() => {
        if (currentPage === 0) {
            fetchItems(currentPage);
        }
    }, [])
    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Hacker News Job Board</h1>
            {
                itemsIds=== null || items.length < 1 ?
                    (<p className={styles.loading}>loading...</p>)
                    :
                    (<div>
                        <div className={styles.items} role='list'>
                            {items.map((item) => {
                                return <JobPosting key={item.id} {...item} />
                            })}
                        </div>
                        <button onClick={()=>fetchItems(currentPage+1)}
                        disabled={fetchingDetails}
                         className={styles['load-more-button']}>{fetchingDetails ? "Loading..." :"Load more jobs"}</button>
                    </div>)
            }
        </div>
    );
}

export default JobBoard;
