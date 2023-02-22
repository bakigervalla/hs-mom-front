import React from 'react'
import styled from 'styled-components'

const SuccessToast = styled.div`
  position: fixed;
  top: 8rem;
  right: 1rem;
  min-width: 30vw;
  padding: 1rem;
  color: white;
  background: var(--success);
  z-index: 999999;
`

const ErrorToast = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  min-width: 30vw;
  padding: 1rem;
  color: white;
  background: var(--error);
`

const Toast = ({ type, message }) => {
  return (
    <React.Fragment>
      {type === 'SUCCESS' && <SuccessToast>{message}</SuccessToast>}
      {type === 'ERROR' && <ErrorToast>{message}</ErrorToast>}
    </React.Fragment>
  )
}

export default Toast
