const wrapper=document.querySelector(".wrapper");
const registerLink=document.querySelector(".register-link");
const loginLink= document.querySelector(".login-link");
const iconClose= document.querySelector(".icon-close");

const loginForm= document.getElementById("loginForm");
const registerForm= document.getElementById("registerForm");

registerLink.addEventListener("click", (e)=>{
    e.preventDefault();
    wrapper.classList.add("active");
});

loginLink.addEventListener("click", (e)=>{
    e.preventDefault();
    wrapper.classList.remove("active");
})

iconClose.addEventListener("click", (e)=>{
    wrapper.classList.remove("active")
})

registerForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const name=document.getElementById("registerName").value;
    const email= document.getElementById("registerEmail").value;
    const password= document.getElementById("registerPassword").value;

    if(localStorage.getItem(email)){
        alert("Account already exists with this Email");
        return;
    }
    const userData={name,email,password};
    localStorage.setItem(email,JSON.stringify(userData));
    alert("Registration successful You can now log in.");
    registerForm.reset();
    wrapper.classList.remove("active");
})
loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email=document.getElementById("loginEmail").value;
    const password= document.getElementById("loginPassword").value;
    const storedUser=localStorage.getItem(email);
    if(!storedUser){
        alert("No Account Found. Please Register.");
        return;
    }
    const userData=JSON.parse(storedUser);

    if (userData.password === password) {
      alert(`Welcome, ${userData.name}! You are logged in.`);
      localStorage.setItem("CurrentUser", userData.name);
      loginForm.reset();
      window.location.href = "index.html";
    } else {
      alert("Incorrect password. Please try again.");
    }
})