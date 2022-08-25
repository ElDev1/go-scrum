import { useFormik } from "formik"
import { Link } from "react-router-dom"
import '../../auth/Auth.styles.css'
import * as Yup from 'yup'

export const Register = () => {
    const initialValues = {
        email: '',
        password: '',
        teamId: '',
        role: '',
        continent: '',
        region: '',
    }

    const required = '* this field is obligatory'

    const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "the minimum number of characters required is 4")
        .required(required),
      password: Yup.string().required(required),
      email: Yup.string().email("Must be a valid Email").required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
    });

    const onSubmit = () => {
        alert()
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    const { handleSubmit, handleChange, values, errors, touched, handleBlur} = formik

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div>
                <label>User Name</label>
                <input 
                name='userName'
                type='text' 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
                className={errors.userName && touched.userName ? 'error': ''}
                />
                {errors.userName && touched.userName && <span className='error-mesagge'>{errors.userName}</span>}
            </div>
            <div>
                <label>Email</label>
                <input 
                name='email'
                type='email' 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={errors.email && touched.email ? 'error': ''}
                />
                {errors.email && touched.email && <span className='error-mesagge'>{errors.email}</span>}
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
                {errors.password && touched.password && <span className='error-mesagge'>{errors.password}</span>}

            </div>
            <input type='hidden' name='teamID' value='9cdbd108-483-947d-8f0c651d0dad' />
            <div>
                <label>Role</label>
                <select 
                name='role' 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
                className={errors.role && touched.role ? 'error': ''}
                >
                    <option value=''>Select your rol</option>
                    <option value='Team Member'>Team Member</option>
                    <option value='Team Leader'>Team Leader</option>
                </select> 
                {errors.role && touched.role && <span className='error-mesagge'>{errors.role}</span>}
            </div>
            <div>
                <label>Continent</label>
                <select 
                name='continent' 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.continent}
                className={errors.continent && touched.continent ? 'error': ''}
                >
                     <option value=''>Select a continent</option>
                    <option value='America'>America</option>
                    <option value='Europe'>Europe</option>
                    <option value='Other'>Other</option>
                </select> 
                {errors.continent && touched.continent && <span className='error-mesagge'>{errors.continent}</span>}
            </div>
            <div>
                <label>Region</label>
                <select 
                name='region' 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.region}
                className={errors.region && touched.region ? 'error': ''}
                >
                    <option value=''>Select a region</option>
                    <option value='Latam'>Latam</option>
                    <option value='Brasil'>Brasil</option>
                    <option value='North America'>North America</option>
                    <option value='Other'>Other</option>
                </select> 
                {errors.region && touched.region && <span className='error-mesagge'>{errors.region}</span>}
            </div>
            <div>
                <button type='submit'>Register</button>
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            </form>
        </div>    
  )
}

