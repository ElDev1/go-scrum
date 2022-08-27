import './Task.styles.css'
import { useResize } from '../../../hook/useResize'
import { Header } from  '../../Header/Header'
import { Card } from '../../Card/Card'
import { TaskForm } from '../../TaskForm/TaskForm'
import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const Tasks = () => {

  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false)
  const { isPhone } = useResize()

  useEffect(() => {
    setLoading(true)
    fetch(`${API_ENDPOINT}/task`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        setList(data.result)
        setLoading(false)  
      })
  }, [])

  const limitString = (str) => {
    if(str.length > 370)
      return { string: str.slice(0,367).concat('...'), addButton: true }
    return { string: str, addButton: false}
  }

  const renderAllCards = () => {
    return list?.map((data) => (
      <Card key={data._id} data={data}/>
    ));
  };

  const renderNewCards = () => {
    return list
      ?.filter(data => data.status === 'NEW')
      .map(data => <Card key={data._id} data={data}/>)
  }

  const renderInProgressCards = () => {
    return list
      ?.filter(data => data.status === 'IN PROGRESS')
      .map(data => <Card key={data._id} data={data}/>)
  }

  const renderFinishedCards = () => {
    return list
      ?.filter(data => data.status === 'FINISHED')
      .map(data => <Card key={data._id} data={data}/>)
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
            !list?.length ? (
              <div>there is no tasks created</div>
              ) : loading ? <Skeleton height={90}/> : (
                <div className='list phone'>
                  {renderAllCards()}
                </div>
              )
            ) : (
            <div className='list_group'>
              {!list?.length ? (
                  <div>there is no tasks created</div>
                ) : loading ? <Skeleton /> : (
                  <>
                    <div className="list">
                            <h3>New</h3>
                            {renderNewCards()}
                          </div>
                          <div className="list">
                            <h3>In progress</h3>
                            {renderInProgressCards()}
                          </div>
                          <div className="list">
                            <h3>Finished</h3>
                            {renderFinishedCards()}
                      </div>    
                  </>
                )}
            </div>
          )}   
        </section>
      </main>
    </>
  )
}
