function Alert({ message, error = false }) {
  const divClass = error
    ? 'text-red-700 bg-red-100 border border-red-300'
    : 'text-green-700 bg-green-100 border border-green-300'

  return (
    <div className={`flex items-center my-1 font-medium py-1 px-2 rounded-md  ${divClass}`}>
      <div slot="avatar">
        {error
          ? (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-octagon w-5 h-5 mx-2">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>)
          : (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle w-5 h-5 mx-2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>)}
      </div>
      <div className="text-xl font-normal  max-w-full flex-initial">
        {message}
      </div>
    </div>
  )
}

export default Alert;