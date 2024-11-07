const universitySelect = document.getElementById("university-select");
const departmentSelect = document.getElementById("department-select");
const specializationSelect = document.getElementById("specialization-select");
const informationTableBody = document.getElementById("table-body");

// Fetch universities data from the API
async function fetchUniversities() {
  try {
    const response = await fetch("/api/universities");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch universities:", error);
    return [];
  }
}

// Populate select options
function populateSelect(selectElement, options) {
  selectElement.innerHTML = '<option value="">Select an option</option>'; // Reset options
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.text = option.name;
    opt.value = option.id;
    selectElement.appendChild(opt);
  });
}

// Populate the table with student data
function populateTable(students) {
  informationTableBody.innerHTML = "";
  students.forEach((student) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
    `;
    informationTableBody.appendChild(tableRow);
  });
}

// Handle university selection change
async function onUniversityChange(event) {
  const selectedUniversityId = event.target.value;
  const universities = await fetchUniversities();
  const selectedUniversity = universities.find(
    (university) => university.id === parseInt(selectedUniversityId)
  );

  if (selectedUniversity) {
    populateSelect(departmentSelect, selectedUniversity.departments);
    departmentSelect.disabled = false;
    specializationSelect.disabled = true;
    specializationSelect.innerHTML =
      '<option value="">Select a Specialization</option>';
    populateTable(getAllStudents(universities)); // Show all students initially
  } else {
    departmentSelect.innerHTML =
      '<option value="">Select a Department</option>';
    departmentSelect.disabled = true;
    specializationSelect.innerHTML =
      '<option value="">Select a Specialization</option>';
    specializationSelect.disabled = true;
    populateTable(getAllStudents(universities)); // Show all students initially
  }
}

// Handle department selection change
async function onDepartmentChange(event) {
  const selectedDepartmentId = event.target.value;
  const selectedUniversityId = universitySelect.value;
  const universities = await fetchUniversities();
  const selectedUniversity = universities.find(
    (university) => university.id === parseInt(selectedUniversityId)
  );
  const selectedDepartment = selectedUniversity.departments.find(
    (department) => department.id === parseInt(selectedDepartmentId)
  );

  if (selectedDepartment) {
    populateSelect(specializationSelect, selectedDepartment.specializations);
    specializationSelect.disabled = false;
    populateTable(getAllStudents(universities)); // Show all students initially
  } else {
    specializationSelect.innerHTML =
      '<option value="">Select a Specialization</option>';
    specializationSelect.disabled = true;
    populateTable(getAllStudents(universities)); // Show all students initially
  }
}

// Handle specialization selection change
async function onSpecializationChange(event) {
  const selectedSpecializationId = event.target.value;
  const selectedUniversityId = universitySelect.value;
  const selectedDepartmentId = departmentSelect.value;
  const universities = await fetchUniversities();
  const selectedUniversity = universities.find(
    (university) => university.id === parseInt(selectedUniversityId)
  );
  const selectedDepartment = selectedUniversity.departments.find(
    (department) => department.id === parseInt(selectedDepartmentId)
  );
  const selectedSpecialization = selectedDepartment.specializations.find(
    (specialization) => specialization.id === parseInt(selectedSpecializationId)
  );

  if (selectedSpecialization) {
    populateTable(selectedSpecialization.students);
  } else {
    populateTable(getAllStudents(universities)); // Show all students if no specialization is selected
  }
}

// Get all students from the data
function getAllStudents(universities) {
  const allStudents = [];
  universities.forEach((university) => {
    university.departments.forEach((department) => {
      department.specializations.forEach((specialization) => {
        allStudents.push(...specialization.students);
      });
    });
  });
  return allStudents;
}

// Initialize the selects and table
async function initialize() {
  const universities = await fetchUniversities();
  populateSelect(universitySelect, universities);
  universitySelect.addEventListener("change", onUniversityChange);
  departmentSelect.addEventListener("change", onDepartmentChange);
  specializationSelect.addEventListener("change", onSpecializationChange);

  // Populate the table with all students initially
  populateTable(getAllStudents(universities));
}

// Run initialization
initialize();
