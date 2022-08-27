import './Task.styles.css'
import { useResize } from '../../../hook/useResize'
import { Header } from  '../../Header/Header'
import { Card } from '../../Card/Card'
import { TaskForm } from '../../TaskForm/TaskForm'
import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton";
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const Tasks = () => {

  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false)
  const [renderList, setRenderList] = useState(null);
  const [tasksfromWho, setTasksfromWho] = useState("ALL");
  const { isPhone } = useResize()

  useEffect(() => {
    setLoading(true)
    fetch(`${API_ENDPOINT}/task${tasksfromWho === 'ME' ? '/me' : ''}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        setList(data.result)
        setRenderList(data.result)
        setLoading(false)  
      })
  }, [tasksfromWho])

  const limitString = (str) => {
    if(str.length > 370)
      return { string: str.slice(0,367).concat('...'), addButton: true }
    return { string: str, addButton: false}
  }

  const renderAllCards = () => {
    return renderList?.map((data) => (
      <Card key={data._id} data={data}/>
    ));
  };

  const renderNewCards = () => {
    return renderList
      ?.filter(data => data.status === 'NEW')
      .map(data => <Card key={data._id} data={data}/>)
  }

  const renderInProgressCards = () => {
    return renderList
      ?.filter(data => data.status === 'IN PROGRESS')
      .map(data => <Card key={data._id} data={data}/>)
  }

  const renderFinishedCards = () => {
    return renderList
      ?.filter(data => data.status === 'FINISHED')
      .map(data => <Card key={data._id} data={data}/>)
  }

  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL") setRenderList(list);
    else
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
  };

  const handleDelete = (id) => {
    
  };

  const handleEditCardStatus = (data) => {
  
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
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={(event) => setTasksfromWho(event.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por título..."
              />
            </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="">Select priority</option>
              <option value="ALL">All</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div>there is no tasks created</div>
              ) : loading ? <Skeleton height={90}/> : (
                <div className='list phone'>
                  {renderAllCards()}
                </div>
              )
            ) : (
            <div className='list_group'>
              {!renderList?.length ? (
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
