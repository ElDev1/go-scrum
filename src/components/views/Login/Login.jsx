import { useFormik } from "formik"

export const Login = () => {
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
    }

    const formik = useFormik({ initialValues, validate, onSubmit })

    const { handleSubmit, handleChange, values, errors} = formik

    return (
        <div className='container'>
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

