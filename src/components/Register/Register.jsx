import { useFormik } from "formik"

export const Register = () => {
    const initialValues = {
        email: '',
        password: '',
    }

    const onSubmit = () => {
        alert()
    }

    const formik = useFormik({ initialValues, onSubmit })

    const { handleSubmit, handleChange, values, errors} = formik

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div>
                <label>User Name</label>
                <input 
                name='userName'
                type='text' 
                onChange={handleChange}
                value={values.userName}
                />
                {errors.userName && <div>{errors.userName}</div>}
            </div>
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
            <input type='hidden' name='teamID' value='9cdbd108-483-947d-8f0c651d0dad' />
            <div>
                <label>Role</label>
                <select 
                name='role' 
                onChange={handleChange}
                value={values.role}
                >
                    <option value='Team Member'>Team Member</option>
                    <option value='Team Leader'>Team Leader</option>
                </select> 
                {errors.role && <div>{errors.role}</div>}
            </div>
            <div>
                <label>Continent</label>
                <select 
                name='continent' 
                onChange={handleChange}
                value={values.continent}
                >
                    <option value='America'>America</option>
                    <option value='Europe'>Europe</option>
                    <option value='Other'>Other</option>
                </select> 
                {errors.continent && <div>{errors.continent}</div>}
            </div>
            <div>
                <label>Region</label>
                <select 
                name='continent' 
                onChange={handleChange}
                value={values.region}
                >
                    <option value='Latam'>Latam</option>
                    <option value='Brasil'>Brasil</option>
                    <option value='North America'>North America</option>
                    <option value='Other'>Other</option>
                </select> 
                {errors.region && <div>{errors.region}</div>}
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
            </form>
        </div>    
  )
}

