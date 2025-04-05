document.addEventListener("DOMContentLoaded", function () {
    showData();
    document.getElementById("Update").style.display = "none"; // Hide Update initially
  });
  
  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
  
    if (!name) return alert("Name is required"), false;
    if (!age || parseInt(age) < 1) return alert("Valid age is required"), false;
    if (!address) return alert("Address is required"), false;
    if (!email || !email.includes("@")) return alert("Valid email is required"), false;
  
    return true;
  }
  
  function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
  
  function AddData() {
    if (validateForm()) {
      const name = document.getElementById("name").value.trim();
      const age = document.getElementById("age").value.trim();
      const address = document.getElementById("address").value.trim();
      const email = document.getElementById("email").value.trim();
  
      let peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
  
      peopleList.push({ name, age, address, email });
      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
      clearForm();
    }
  }
  
  function showData() {
    const peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
    const tbody = document.querySelector("#crudTable tbody");
    tbody.innerHTML = "";
  
    peopleList.forEach((person, index) => {
      const row = `
        <tr>
          <td>${person.name}</td>
          <td>${person.age}</td>
          <td>${person.address}</td>
          <td>${person.email}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteData(${index})">Delete</button>
            <button class="btn btn-warning m-2" onclick="editData(${index})">Edit</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  }
  
  function deleteData(index) {
    let peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
  }
  
  let currentEditIndex = null;
  
  function editData(index) {
    let peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
  
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;
  
    currentEditIndex = index;
  
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "inline-block";
  }
  
  document.getElementById("Update").onclick = function () {
    if (validateForm()) {
      let peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
  
      peopleList[currentEditIndex] = {
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value.trim(),
        address: document.getElementById("address").value.trim(),
        email: document.getElementById("email").value.trim(),
      };
  
      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
      clearForm();
  
      document.getElementById("Submit").style.display = "inline-block";
      document.getElementById("Update").style.display = "none";
    }
  };
  