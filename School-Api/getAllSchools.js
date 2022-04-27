const schoolsList = document.getElementById("school-container");

let apiUrl = "https://sch-finder-api.herokuapp.com";

function fetchAllSchools() {
  fetch(`${apiUrl}/api/schools`)
    .then((response) => response.json())
    .then((data) => renderData(data));
}

fetchAllSchools();

function renderData(schools) {
  // console.log(schools);
  let list = schools
    .map(
      (schools, i) =>
        `
        <div class="col">
          <div class="card shadow-sm">
             <img src="https://www.nairaland.com/attachments/9273705_abulogo_jpeg76ff220cc807e4d2031970f376113b54" alt="Ahmadu Bello University Zaria"
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" 
              role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
             <rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg>
            <div class="card-body">
                             <h5> ${schools.name} </h5>
                             <h4> ${schools.country} </h4>
                             <h5> Total_Enrollment - ${schools.total_enrollment} </h5>
                             <p class="card-text"> ${schools.short_desc} </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  <button type="button" onclick="deleteASchool(${schools.id})" id="" class="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
               <small class="text-muted">${schools.tuition_fee_range}</small>
              </div>
            </div>
          </div>
        </div>
`
    )
    .join(" ");
  schoolsList.innerHTML = list;
}

const deleteASchool = (id) => {
  const token = window.localStorage.getItem('token')
  console.log(token)
  fetch(`${apiUrl}/api/schools/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    },
  })
    .then((responseJson) => {
      console.log("School Deleted Successfully")
      fetchAllSchools();
    })
}

// // const deleteASchool = (id) => {
// // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJDb2tlciIsImxhc3ROYW1lIjoiQWRla3VubGUiLCJlbWFpbCI6ImNvYWRlZGlia0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpZCI6NjgsImlhdCI6MTY1MDkxOTUxOH0.3YGzbIiaROinViIurQXJmyq66LqULpNgbxW2BUL_J7g"
// //   fetch(`${apiUrl}/api/schools/${id}`, {
// //     method: "DELETE",
// //     headers: new Headers({
// //       Authorization: `Bearer ${token}`,
// //     }),
// //   })
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log("School Deleted Successfully");
// //     });
// // };
