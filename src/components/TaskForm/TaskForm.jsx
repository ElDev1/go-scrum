import './TaskForm.styles.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const TaskForm = () => {
    const initialValues = {
        title: '',
        status: '',
        priority: '',
        description: '',
    }


    const onSubmit = () => {
      alert()
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

    const { handleSubmit, handleChange, errors, touched, handleBlur } = formik

    return (
        <section className="task-form">
            <h2>New task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input name="title" className={errors.title ? 'error': ''} onChange={handleChange} onBlur={handleBlur} placeholder='title'/>
                    {errors.title && touched.title && <span className='error-mesagge'>{errors.title}</span>}
                    </div>
                    <div>
                        <select name='status' className={errors.status ? 'error': ''} onChange={handleChange} onBlur={handleBlur}>
                        <option value=''>Select a state</option>
                            <option value="new">New</option>
                            <option value="inProcess">in Process</option>
                            <option value="finished">Finished</option>
                        </select>
                    {errors.status && touched.status && <span className='error-mesagge'>{errors.status}</span>}
                    </div>
                    <div>
                        <select name='priority' className={errors.priority ? 'error': ''} onChange={handleChange} onBlur={handleBlur}>
                        <option value=''>Select priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    {errors.priority && touched.priority && <span className='error-mesagge'>{errors.priority}</span>}
                    </div>
                </div>
                <div>
                    <textarea name='description' onChange={handleChange} placeholder='description' />
                </div>
                <button type='submit'>Create</button>
            </form>
        </section>
    )
}
