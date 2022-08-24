import { Header } from  '../../Header/Header'

export const Tasks = () => {
  return (
    <>
      <Header />
      <main>
        <section className='wrapper_list'>
          <div className='list_header'>
            <h2>My Task</h2>
          </div>
          <div className='list'>
            <div className='card'>
              <div className='close'>x</div>
              <h3>Task 1</h3>
              <h6>24/1/2022 16:40 hs.</h6>
              <h5>Devi Amaolo</h5>
              <button type='button'>New</button>
              <button type='button'>Alta</button>
              <p>Fake description</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
