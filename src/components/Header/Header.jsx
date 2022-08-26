import './Header.styles.css'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
    }

    return (
        <header>
            <img src='' alt='logo' />
            <div onClick={handleLogout}>x</div>
        </header>
    )   
}
