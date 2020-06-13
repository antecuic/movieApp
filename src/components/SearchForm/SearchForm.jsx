import React from 'react';

import styles from './SearchForm.module.css';

const searchForm = () => {

    return (

        <div className={styles.FormContainer}>
            <form type="submit">
                <input className={styles.InputSearch} type="text" name="query" placeholder="Search..." />
            </form>
        </div>

    )



}

export default searchForm;