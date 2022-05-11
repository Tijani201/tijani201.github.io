let apiUrl = 'https://sch-finder-api.herokuapp.com'

var form = document.getElementById('form')
const button = document.getElementById('submit')
var schoolsList = document.getElementById('container')

function updateASchool(newData) {
  const token = window.localStorage.getItem('token')
  console.log(token)
  const id = getUrlParameter('id')
  console.log(id)
  fetch(`${apiUrl}/api/schools/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newData)
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Something went wrong')
    })
    .then((responseJson) => {
      reDirect()
      console.log(newData)
    })
    .catch((error) => {
      console.log(error)
    })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  let newData = {
    name: document.getElementById('name').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    address: document.getElementById('address').value,
    type: document.getElementById('type').value,
    tuition_fee_range: document.getElementById('tuition_fee_range').value,
    ownership: document.getElementById('ownership').value,
    founded: document.getElementById('founded').value,
    total_enrollment: document.getElementById('total_enrollment').value,
    short_desc: document.getElementById('short_desc').value
  }
  updateASchool(newData)
})

function reDirect() {
  window.location.href = 'getAllSchools.html'
  console.log('School Updated Successfully')
}

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
  let list = ` <form class="containers" id="form">
        <input
          type="text"
          id="name"
          value=""
          placeholder="Enter School Name"
          class="form-control form-control-lg"
        />

        <input
          type="text"
          id="country"
          value=""
          placeholder="Enter Country"
          class="form-control form-control-lg"
        />

        <input
          type="text"
          id="city"
          value=""
          placeholder="Enter City"
          class="form-control form-control-lg"
        />

        <input
          type="text"
          id="address"
          value=""
          placeholder="Enter Address"
          class="form-control form-control-lg"
        />

        <input
          type="text"
          id="type"
          value=""
          placeholder="Let us Know if it's University or College"
          class="form-control form-control-lg"
        />

        <input
          type="text"
          id="tuition_fee_range"
          value=""
          placeholder="Enter Tuition Fee"
          class="form-control form-control-lg"
        />

        <input
          type="text"
          id="ownership"
          value=""
          placeholder="Tell us if it's Private or Public"
          class="form-control form-control-lg"
        />

        <input
          type="text"
          id="founded"
          value=""
          placeholder=" What year was it Founded"
          class="form-control form-control-lg"
        />

        <input
          type="text"
          id="total_enrollment"
          value=""
          placeholder="Tell us the Total Enrollment"
          class="form-control form-control-lg"
        />

        <textarea
          class="form-control form-control-lg"
          id="short_desc"
          placeholder="Write a Short description"
        ></textarea>

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary" id="submit">
            Click to Update School
          </button>
        </div>
      </form>
`

  schoolsList.innerHTML = list
}
