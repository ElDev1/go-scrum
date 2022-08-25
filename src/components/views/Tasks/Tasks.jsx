import './Task.styles.css'
import { useResize } from '../../../hook/useResize'
import { Header } from  '../../Header/Header'
import { cardsData } from './data'
import { Card } from '../../Card/Card'
import { TaskForm } from '../../TaskForm/TaskForm'

export const Tasks = () => {

  const { isPhone } = useResize()

  const limitString = (str) => {
    if(str.length > 370)
      return { string: str.slice(0,367).concat('...'), addButton: true }
    return { string: str, addButton: false}
  }

  const renderAllCards = () => {
    return cardsData.map(data => <Card key={data.id} data={data}/>)
  }

  return (
    <>
      <Header />
      <main>
        <TaskForm />
        <section className='wrapper_list'>
          <div className='list_header'>
            <h2>My Task</h2>
          </div>
          {isPhone ? (
            <div className='list phone'>
              {renderAllCards()}
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
