import Swal from 'sweetalert2';
import axios from 'axios';

const deleteBtn = document.querySelector('#eliminar-proyecto');

if(deleteBtn){
    deleteBtn.addEventListener('click', e=>{
        const urlProject = e.target.dataset.projectUrl;

        // console.log(urlProject);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              // send petition via axios  
              
              const url = `${location.origin}/projects/${urlProject}`;

              axios.delete(url,{params:{urlProject}})
                   .then(function(res){
                       Swal.fire(
                         'Deleted!',
                         res.data,
                         'success'
                       );
                       setTimeout(()=>{
                         window.location.href="/"
                       },3000);

                   })
                   .catch(()=>{
                       Swal.fire({
                           type: 'error',
                           title: 'An error occured',
                           text: 'error deleting project'
                       })
                   })
            }
          })
    
    })
}

export default deleteBtn