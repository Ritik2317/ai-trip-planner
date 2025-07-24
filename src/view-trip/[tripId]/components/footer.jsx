import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-black text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Created by <span className="text-white font-medium">Riteek Yadav</span></p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="https://github.com/Ritik2317/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            🌐 GitHub
          </a>
          <a href="https://linkedin.com/in/riteek-yadav" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            💼 LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
