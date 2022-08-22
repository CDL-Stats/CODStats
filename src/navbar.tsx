import React, { useState } from 'react';

function NavBar() {
    const [dropdown, setDropdown] = useState(false)
    const [athleteDropdown, setAthletedDropdown] = useState(false)
    const [teamDropdown, setTeamDropdown] = useState(false)
    const [tournamentsDropdown, setTournamentsDropdown] = useState(false)
    const [other, setOther] = useState(false)

    const handleHover = () => {
        setDropdown(current => !current)
        setAthletedDropdown(false)
        setTeamDropdown(false)
        setTournamentsDropdown(false)
        setOther(false)
      }
    
      const handleAthlete = () => {
        setAthletedDropdown(current => !current)
        setDropdown(false)
        setTeamDropdown(false)
        setTournamentsDropdown(false)
        setOther(false)
      }
    
      const handleTeam = () => {
        setTeamDropdown(current => !current)
        setDropdown(false)
        setAthletedDropdown(false)
        setTournamentsDropdown(false)
        setOther(false)
      }

      const handleTournaments = () => {
        setTournamentsDropdown(current => !current)
        setDropdown(false)
        setAthletedDropdown(false)
        setTeamDropdown(false)
        setOther(false)
      }

      const handleOther = () => {
        setOther(current => !current)
        setDropdown(false)
        setAthletedDropdown(false)
        setTeamDropdown(false)
        setTournamentsDropdown(false)
      }

      return (
        <nav className='bg-blue-700 x-data="{navbarOpen:false}'>
        <div className="container flex flex-wrap mx-auto py-2 px-4 {hidden:!navbarOpen}">
          <a href='/teams' className='inline-flex p-2 text-white text-xl font-bold uppercase tracking-wider'>COD Stats</a>
          <button className='inline-flex items-center justify-center text-white border h-10 w-10 rounded-md outline-none foucs:outline-none lg:hidden ml-auto'  onClick={handleHover}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> 
          <div className={`w-full lg:inline-flex lg:w-auto mt-2 lg:mt-0 ${dropdown ? '' : 'hidden'}`}>
            <ul className='flex flex-col w-full space-y-2 lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-2'>
              
              <li className={`relative`}>
                <button className='flex px-4 py-2 font-medium text-white hover:bg-blue-800 rounded-md outline-none focus:outline-none' onClick={handleAthlete}>Players</button>
                <div className={`right-0 p-2 mt-1 bg-white rounded-md shadow lg:absolute ${athleteDropdown ? 'flex flex-col' : 'hidden'}`}>
                  <ul className='space-y-2 lg:w-48'>
                    <li>
                      <a href='/players' className='flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black'>
                        Players
                      </a>
                    </li>
                    <li>
                      <a href='/players/new' className='flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black'>
                        Create Player
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={`relative`}>
                <button className='flex px-4 py-2 font-medium text-white hover:bg-blue-800 rounded-md outline-none focus:outline-none' onClick={handleTeam}>Teams</button>
                <div className={`right-0 p-2 mt-1 bg-white rounded-md shadow lg:absolute ${teamDropdown ? 'flex flex-col' : 'hidden'}`}>
                  <ul className='space-y-2 lg:w-48'>
                    <li>
                      <a href='/teams' className='flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black'>
                        Teams
                      </a>
                    </li>
                    <li>
                      <a href='/teams/new' className='flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black'>
                        Create Team
                      </a>
                    </li>
                  </ul>
                </div>
                </li>

                <li className={`relative`}>
                <button className='flex px-4 py-2 font-medium text-white hover:bg-blue-800 rounded-md outline-none focus:outline-none' onClick={handleTournaments}>Tournaments</button>
                <div className={`right-0 p-2 mt-1 bg-white rounded-md shadow lg:absolute ${tournamentsDropdown ? 'flex flex-col' : 'hidden'}`}>
                  <ul className='space-y-2 lg:w-48'>
                    <li>
                      <a href='/tournaments' className='flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black'>
                        Tournaments
                      </a>
                    </li>
                    <li>
                      <a href='/tournaments/new' className='flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black'>
                        Create Tournament
                      </a>
                    </li>
                  </ul>
                </div>
                </li>

                <li className={`relative`}>
                <button className='flex px-4 py-2 font-medium text-white hover:bg-blue-800 rounded-md outline-none focus:outline-none' onClick={handleOther}>Other</button>
                <div className={`right-0 p-2 mt-1 bg-white rounded-md shadow lg:absolute ${other ? 'flex flex-col' : 'hidden'}`}>
                  <ul className='space-y-2 lg:w-48'>
                    <li>
                      <a href='/season' className='flex p-2 font-medium text-gray-600 rounded-md  hover:bg-gray-100 hover:text-black'>
                        Seasons
                      </a>
                    </li>
                  </ul>
                </div>
                </li>

            </ul>
          </div>
        </div>
      </nav>
      )
}

export default NavBar;
