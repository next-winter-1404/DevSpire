import React from 'react'

const DotList = ({...props}) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M4 5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M20 5H20.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12H20.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 19H20.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4 19H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
}

export default DotList