import React from 'react'



const Clock = ({...props}) => {

    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M7.75 14.75C11.616 14.75 14.75 11.616 14.75 7.75C14.75 3.88401 11.616 0.75 7.75 0.75C3.88401 0.75 0.75 3.88401 0.75 7.75C0.75 11.616 3.88401 14.75 7.75 14.75Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 5.99995L8.44993 8.44967M10.55 4.94995L7.05 8.44995" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )

}

export default Clock