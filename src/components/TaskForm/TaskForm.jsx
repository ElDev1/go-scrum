import './TaskForm.styles.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env


export const TaskForm = () => {
    const initialValues = {
        title: '',
        status: '',
        importance: '',
        description: '',
    }


    const onSubmit = () => {
        fetch(`${API_ENDPOINT}/task`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                task: values
            }),
          })
            .then((response) => response.json())
            .then((data) => {
                resetForm()
                toast('Task created !')
              })
    }

    const required = '* this field is obligatory'

    const validationSchema = () =>
    Yup.object().shape({
        title: Yup.string()
        .min(6, "the minimum number of characters required is 6")
        .required(required),
        status: Yup.string().required(required),
        description: Yup.string().required(required),
        importance: Yup.string().required(required),
    });

    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    const { handleSubmit, handleChange, errors, touched, handleBlur, values, resetForm } = formik

    return (
        <section className="task-form">
            <h2>New task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input name="title" className={errors.title && touched.title ? 'error': ''} value={values.title} onChange={handleChange} onBlur={handleBlur} placeholder='title'/>
                    {errors.title && touched.title && <span className='error-mesagge'>{errors.title}</span>}
                    </div>
                    <div>
                        <select name='status' value={values.status} className={errors.status && touched.status ? 'error': ''} onChange={handleChange} onBlur={handleBlur}>
                        <option value=''>Select a state</option>
                            <option value="NEW">New</option>
                            <option value="IN PROGRESS">in Process</option>
                            <option value="FINISHED">Finished</option>
                        </select>
                    {errors.status && touched.status && <span className='error-mesagge'>{errors.status}</span>}
                    </div>
                    <div>
                        <select name='importance' value={values.importance} className={errors.importance && touched.importance ? 'error': ''} onChange={handleChange} onBlur={handleBlur}>
                        <option value=''>Select importance</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    {errors.importance && touched.importance && <span className='error-mesagge'>{errors.importance}</span>}
                    </div>
                </div>
                <div>
                    <textarea name='description' value={values.description} className={errors.description && touched.description ? 'error' : ''} onBlur={handleBlur} onChange={handleChange} placeholder='description' />
                    {errors.description && touched.description && (
                        <span className='error-message'>{errors.title}</span>
                    )}
                </div>
                <button type='submit'>Create</button>
            </form>
            <ToastContainer />
        </section>
    )
}
