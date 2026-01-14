import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} BookApp
    </footer>
  )
}

export default Footer