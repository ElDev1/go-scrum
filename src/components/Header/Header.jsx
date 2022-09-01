import './Header.styles.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export const Header = () => {
  
    const navigate = useNavigate()
    
    const { tasks } = useSelector(state => {
        return state.taskReducer
    })
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
    }

    return (
        <header>
            <img src='' alt='logo' />
            <div className='wrapper_right_header'>
                <div className='black'>Task created: {tasks?.length}</div>
                <div className='black'>{localStorage.getItem('userName')}</div>
                <div onClick={handleLogout}>x</div>
            </div>
        </header>
    )   
}
