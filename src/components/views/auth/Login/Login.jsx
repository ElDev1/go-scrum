import { useFormik } from "formik"
import '../Auth.styles.css'
import { useNavigate, Link } from "react-router-dom"
import * as Yup from 'yup'

import { swal } from "../../../../utils/swal"

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env 

export const Login = () => {
    
    const navigate = useNavigate()

    const initialValues = {
        userName: '',
        password: '',
    }

    const required = '* this field is obligatory'

    const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "the minimum number of characters required is 4")
        .required(required),
      password: Yup.string().required(required),
    });

    const onSubmit = () => {
        const { userName, password } = values

        fetch(`${API_ENDPOINT}/auth/data`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName,
                password,
            }),
          })
            .then((response) => response.json())
            .then(data => {
                if(data.status_code === 200) {
                    localStorage.setItem('token', data?.result?.token)
                    localStorage.setItem("userName", data?.result?.user.userName);
                    navigate('/', { replace: true })
                } else {
                    swal()
                }
            })
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    const { touched, handleBlur, handleSubmit, handleChange, values, errors} = formik

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
                <label>User name</label>
                <input 
                name='userName'
                type='text' 
                onChange={handleChange}
                value={values.userName}
                onBlur={handleBlur}
                className={errors.userName && touched.userName ? 'error': ''}
                />
                {errors.userName && touched.userName && <div>{errors.userName}</div>}
            </div>
            <div>
                <label>Password</label>
                <input 
                name='password'
                type='password' 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={errors.password && touched.password ? 'error': ''}
                />
                {errors.password && touched.password && <div>{errors.password}</div>}
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
            <div>
                <Link to='/register'>Register</Link>
            </div>
            </form>
        </div>    
  )
}

