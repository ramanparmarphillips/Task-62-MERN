import React from 'react'

// This component is used to display the loading spinner, which is used when the app is fetching data from the backend
function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
        <div className='loadingSpinner'></div>
    </div>
  )
}

export default Spinner
