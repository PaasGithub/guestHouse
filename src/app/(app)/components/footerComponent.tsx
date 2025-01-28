import React from 'react'

const footerComponent = () => {
  return (
    <footer className="text-center py-6 bg-gray-100 dark:bg-gray-900">
        <p>&copy; {new Date().getFullYear()} Idyllic Guest House. All Rights Reserved.</p>
    </footer>
  )
}

export default footerComponent