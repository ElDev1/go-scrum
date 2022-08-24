import { Header } from  '../../Header/Header'
import { useEffect, useState } from 'react'

export const Tasks = () => {
  const [isPhone, setIsPhone] = useState(window.innerWidth < 900 ? true : false)

  const handleResize = () => {
    if(window.innerWidth < 900) setIsPhone(true)
    else setIsPhone(false)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  const limitString = (str) => {
    if(str.length > 370)
      return { string: str.slice(0,367).concat('...'), addButton: true }
    return { string: str, addButton: false}
  }

  return (
    <>
      <Header />
      <main>
        <section className='wrapper_list'>
          <div className='list_header'>
            <h2>My Task</h2>
          </div>
          {isPhone ? (<div className='list phone'>
            <h4>Finished</h4>
              <div className='card'>
                <div className='close'>x</div>
                <h3>Task 1</h3>
                <h6>24/1/2022 16:40 hs.</h6>
                <h5>Devi Amaolo</h5>
                <button type='button'>New</button>
                <button type='button'>Alta</button>
                <p>{limitString(`fake description`).string}</p>
              </div>
            </div>) : (<div className='list_group'>
            <div className='list'>
              <h4>news</h4>
              <div className='card'>
                <div className='close'>x</div>
                <h3>Task 1</h3>
                <h6>24/1/2022 16:40 hs.</h6>
                <h5>Devi Amaolo</h5>
                <button type='button'>New</button>
                <button type='button'>Alta</button>
                <p>Fake description</p>
              </div>
            </div>
          </div>)}   
        </section>
      </main>
    </>
  )
}
