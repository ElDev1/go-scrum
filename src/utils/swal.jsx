import Swal from "sweetalert2"


export const swal = () => {
  return (
    Swal.fire({
        title: 'wrong credentials',
        text: 'please introduce valid user name and password',
        width: '400px',
        timer: 10000,
        timerProgressBar: true,
    })
  )
}
