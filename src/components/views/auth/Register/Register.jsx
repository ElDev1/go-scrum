import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../../auth/Auth.styles.css'
import * as Yup from 'yup'
import { v4 as uuidv4 } from "uuid"
import { Switch, FormControlLabel } from '@mui/material'
import { useNavigate } from "react-router-dom"

const { REACT_APP_API_ENDPOINT } = process.env

export const Register = () => {

    const [data, setData] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${REACT_APP_API_ENDPOINT}/auth/data`)
            .then(response => response.json())
            .then(data => setData(data.result))
    },[])

    console.log({data})

    const initialValues = {
        email: '',
        password: '',
        teamId: '',
        role: '',
        continent: '',
        region: '',
        switch: false,
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

    const handleChangeContinent = value => {
        setFieldValue('continent', value)
        if(value === 'America') setFieldValue('region','otro')
    }

    const onSubmit = () => {
        const teamID = !values.teamId ? uuidv4() : values.teamId;
    
        fetch(`${REACT_APP_API_ENDPOINT}/auth/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              userName: values.userName,
              password: values.password,
              email: values.email,
              teamID,
              role: values.role,
              continent: values.continent,
              region: values.region,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) =>
            navigate("/registered/" + data?.result?.user?.teamID, {
              replace: true,
            })
          )
      }

    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    const { handleSubmit, handleChange, values, errors, touched, handleBlur, setFieldValue} = formik

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
            <FormControlLabel
                control={
                    <Switch
                    value={values.switch}
                    onChange={() =>
                        formik.setFieldValue("switch", !formik.values.switch)
                    }
                    name="switch"
                    color="secondary"
                    />
                }
                label="you already are in a team"
            />
            {values.switch && (
                <div>
                    <label>Please introduce your Id team</label>
                    <input 
                        type='text' 
                        name='teamID' 
                        value={values.teamId} 
                        onChange={handleChange}
                    />
                </div>
            )}
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
                    {data?.Rol?.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select> 
                {errors.role && touched.role && <span className='error-mesagge'>{errors.role}</span>}
            </div>
            <div>
                <label>Continent</label>
                <select 
                name='continent' 
                onChange={event => handleChangeContinent(event.currentTarget.value)}
                onBlur={handleBlur}
                value={values.continent}
                className={errors.continent && touched.continent ? 'error': ''}
                >
                    <option value=''>Select a continent</option>
                    {data?.continente?.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select> 
                {errors.continent && touched.continent && <span className='error-mesagge'>{errors.continent}</span>}
            </div>
            {values.continent === 'America' && (
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
                        {data?.region?.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select> 
                    {errors.region && touched.region && <span className='error-mesagge'>{errors.region}</span>}
                </div>
            )}
     
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

