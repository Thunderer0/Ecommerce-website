import React, { Fragment } from 'react'

const Search = () => {
    return (
        <Fragment>
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input
                type="text"
                placeholder="Search the Product"
                onChange={(e)=> setKeyword(e.target.value)}
                />
            </form>
        </Fragment>
    )
}

export default Search
