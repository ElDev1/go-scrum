import { useParams } from "react-router-dom"

export default function Registered() {
   const { teamID } = useParams()

   return <div className="container">your ID team is: {teamID}</div>
}