import './Task.styles.css'
import { useResize } from '../../../hook/useResize'
import { Header } from  '../../Header/Header'
import { Card } from '../../Card/Card'
import { TaskForm } from '../../TaskForm/TaskForm'
import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton";
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import debounce from 'lodash.debounce'
import { useSelector, useDispatch } from 'react-redux'
import { getTask, deleteTask, editTaskStatus } from '../../../store/actions/taskActions'

export const Tasks = () => {

  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [tasksfromWho, setTasksfromWho] = useState("ALL");
  const [search, setSearch ] = useState('')
  const { isPhone } = useResize()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTask(tasksfromWho === 'ME' ? '/me' : ''))
  }, [tasksfromWho, dispatch])

  const { loading, error, task } = useSelector(state => {
    return state.taskReducer
  })

  useEffect(() => {
    if(task?.length) {
      setList(task)
      setRenderList(task)
    }
  },[task])

  useEffect(() => {
    if (search)
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    else setRenderList(list);
  }, [search]);

  if(error) return <div>Error</div>

  const renderAllCards = () => {
    return renderList?.map((data) => (
      <Card 
        key={data._id} 
        data={data}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
        />
      ))
  }

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => (
        <Card
          key={data._id}
          data={data}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ));
  };

  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL") setRenderList(list);
    else
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  };

  const handleEditCardStatus = (data) => {
    dispatch(editTaskStatus(data))
  } 

  const handleSearch = debounce(event => {
    setSearch(event?.target?.value)
  },1000)
  
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
                placeholder="Find by title..."
                onChange={handleSearch}
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
                            {renderColumnCards('NEW')}
                          </div>
                          <div className="list">
                            <h3>In progress</h3>
                            {renderColumnCards('IN PROGRESS')}
                          </div>
                          <div className="list">
                            <h3>Finished</h3>
                            {renderColumnCards('FINISHED')}
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
