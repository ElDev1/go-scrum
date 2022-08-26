import { useParams } from "react-router-dom"

export const Registered = () => {
    const { teamID } = useParams()
  
    return (
    <div className='container'>your ID team is {teamID}</div>
  )
}
