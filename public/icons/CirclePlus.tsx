import React from 'react'


const CirclePlus = ({...props}) => {

    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M36.6666 20.0002C36.6666 10.7954 29.2046 3.3335 19.9999 3.3335C10.7952 3.3335 3.33325 10.7954 3.33325 20.0002C3.33325 29.2048 10.7952 36.6668 19.9999 36.6668C29.2046 36.6668 36.6666 29.2048 36.6666 20.0002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.9999 13.3335V26.6668M26.6666 20.0002H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )

}

export default CirclePlus