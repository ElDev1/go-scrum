import './TaskForm.styles.css'
import { useFormik } from 'formik'

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

    const formik = useFormik({ initialValues,  onSubmit })

    const { handleSubmit, handleChange } = formik

    return (
        <section className="task-form">
            <h2>New task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input name="title" onChange={handleChange} placeholder='title'/>
                    </div>
                    <div>
                        <select name='status' onChange={handleChange}>
                        <option value=''>Select a state</option>
                            <option value="new">New</option>
                            <option value="inProcess">in Process</option>
                            <option value="finished">Finished</option>
                        </select>
                    </div>
                    <div>
                        <select name='priority' onChange={handleChange}>
                        <option value=''>Select priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
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
