import { useFormik } from "formik"
import './Login.styles.css'
import { useNavigate } from "react-router-dom"


export const Login = () => {
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: '',
    }

    const validate = values => {
        const errors = {}

        if(!values.email) {
            errors.email = 'Email is required'
        }
        if(!values.password) {
            errors.password = 'Password is required'
        }

        return errors
    }

    const onSubmit = () => {
        localStorage.setItem('logged', 'yes')
        navigate('/', { replace: true })
    }

    const formik = useFormik({ initialValues, validate, onSubmit })

    const { handleSubmit, handleChange, values, errors} = formik

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
                <label>Email</label>
                <input 
                name='email'
                type='email' 
                onChange={handleChange}
                value={values.email}
                />
                {errors.email && <div>{errors.email}</div>}
            </div>
            <div>
                <label>Password</label>
                <input 
                name='password'
                type='password' 
                onChange={handleChange}
                value={values.password}
                />
                {errors.password && <div>{errors.password}</div>}
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
            </form>
        </div>    
  )
}

