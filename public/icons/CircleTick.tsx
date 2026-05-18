import React from "react"

const CircleTick = ({...props}) => {

    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M18.3334 9.99999C18.3334 5.39761 14.6024 1.66666 10.0001 1.66666C5.39771 1.66666 1.66675 5.39761 1.66675 9.99999C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333C14.6024 18.3333 18.3334 14.6023 18.3334 9.99999Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6.66675 10.4167L8.75008 12.5L13.3334 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )

}

export default CircleTick