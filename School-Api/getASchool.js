let apiUrl = 'https://sch-finder-api.herokuapp.com'

const schoolsList = document.getElementById('school-container')

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

function getASchool() {
  const id = getUrlParameter('id')
  console.log(id)
  fetch(`${apiUrl}/api/schools/${id}`)
    .then((response) => response.json())
    .then((data) => bringData(data))
}

getASchool()

function bringData(school) {
  console.log(school)
  let list = `<div class="col">
          <div class="card shadow-sm">
             <img src="https://www.nairaland.com/attachments/9273705_abulogo_jpeg76ff220cc807e4d2031970f376113b54" alt="Ahmadu Bello University Zaria"
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" 
              role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
             <rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg>
            <div class="card-body">
                             <h3> ${school.name} </h3>
                             <h4> ${school.country} </h4>
                             <h5> Total_Enrollment - ${school.total_enrollment} </h5>
                             <p class="card-text"> ${school.short_desc} </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href="getASchool.html?id=${school.id}" class="btn btn-sm btn-outline-secondary">More info</a>
                  <a href="updateASchool.html?id=${school.id}" class="btn btn-sm btn-outline-secondary">Update</a>
                  <button type="button" onclick="deleteASchool(${school.id})" id="" class="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
               <small class="text-muted">${school.tuition_fee_range}</small>
              </div>
            </div>
          </div>
        </div>`

  schoolsList.innerHTML = list
}

const deleteASchool = (id) => {
  const token = window.localStorage.getItem('token')
  console.log(id)
  console.log(token)
  fetch(`${apiUrl}/api/schools/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`
    }
  }).then((responseJson) => {
    console.log('School Deleted Successfully')
    reDirect()
  })
}

function reDirect() {
  window.location.href = './getAllSchools.html'
}
