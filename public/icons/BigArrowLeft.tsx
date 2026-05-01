import React from 'react'

const BigArrowLeft = ({...props}) => {
  return (
    <svg width="82" height="34" viewBox="0 0 82 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17 1L1 17L17 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 17H81" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default BigArrowLeft