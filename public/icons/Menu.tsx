import React from 'react'


const Menu = ({...props}) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M10 6H20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 12H20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 12H20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 18H14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default Menu