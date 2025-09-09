// Declaring all input fields & buttons:
const fullName = document.querySelector(".name");
const email = document.querySelector(".email");
const github = document.querySelector(".github");
const submitButton = document.querySelector(".submit");
const form = document.querySelector("form");
const imgInput = document.querySelector("input[type='file']");
const imgSpan = document.querySelector(".info span");
const imgMessage = document.querySelector(".info");
const img = document.querySelector(`.avtContainer img`);
const formContainer = document.querySelector(`.container`);
const ticketContainer = document.querySelector(`.ticketContainer`);
const ticketH3 = document.querySelector(`.headingTicket h3`);
const ticketH4 = document.querySelector(`.headingTicket h4`);
const ticketName = document.querySelector(`.right .name`);
const ticketGithub = document.querySelector(`.right .github`);
const ticketImg = document.querySelector(`.bottom .left img`);
const DateSpan = document.querySelector(`.right .date`);
const validImgTypes = ["image/jpeg", "image/png"];

// Mapping input fields to their validation rules:
let inputMap = [
    {field: fullName, regEx: /[a-zA-Z]{3,} [a-zA-Z]{3,}/, key: "fullName"},
    {field: email, regEx: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]{2,}$/, key: "email"},
    {field: github, regEx: /^@([a-zA-Z0-9]+)$/, key: "github"},
    {field: imgInput, regEx: /.+/, key: "img"}
]

// Check all inputs Validation:
let validation = {
    fullName: false,
    email: false,
    github: false,
    img: false
}

// Check typing fields validation:
inputMap.forEach(({field, regEx, key}, index)=>{
    field.addEventListener("input", ()=>{
        const errorMessage = document.querySelectorAll(`.error`)[index];
        if(!regEx.test(field.value.trim())){
            errorMessage.classList.add(`appear`);
            validation[key] = false;
        } else{
            errorMessage.classList.remove(`appear`);
            validation[key] = true;
        };
        console.log(validation);
    });
});

// Check image field validation:
imgInput.addEventListener("change", ()=>{
    const file = imgInput.files[0];

    if(!file){
        imgSpan.textContent = `Please select an image`;
        validation.img = false;
        imgMessage.classList.add("imgError");
    }else if(!validImgTypes.includes(file.type)){
        imgSpan.textContent = `Invalid image type. Please select a JPEG or PNG image.`;
        validation.img = false;
        imgMessage.classList.add("imgError");
    }else if(file.size > 500 * 1024){
        imgSpan.textContent = `Image size must be less than 500KB.`;
        validation.img = false;
        imgMessage.classList.add("imgError");
    }else{
        img.src = URL.createObjectURL(file);
        imgSpan.textContent = `Image loaded Successfully: ${file.name}`;
        validation.img = true;
        imgMessage.classList.remove("imgError");
    };
    console.log(validation);
});

// Submit the form if all fields are valid:
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    // show the error message on the invalid input(s) 
    if(!Object.values(validation).every(value => value === true)){
        Object.keys(validation).forEach((key, index)=>{
            if(validation[key] === false){
                const errorMessage = document.querySelectorAll(`.error`)[index];
                errorMessage.classList.add(`appear`);
            }
        })
    } else{
        formContainer.classList.add(`submitActive`);
        form.classList.add(`submitForm`);
        ticketContainer.classList.add(`ticketShow`);
    }

    inputMap.forEach((obj)=>{
        obj.field === fullName ? obj.value = fullName.value.split(" ").slice(0, 2).join(" "): obj.value = obj.field.value;
    });

    ticketH3.innerHTML = `Congrats, <span>${inputMap[0].value}</span>! Your ticket is ready.`;
    ticketH4.innerHTML = `We've emailed your ticket to <span>${inputMap[1].value}</span> and will send updates in the run up to the event`;
    ticketName.textContent = inputMap[0].value;
    ticketGithub.textContent = inputMap[2].value;
    ticketImg.src = URL.createObjectURL(imgInput.files[0]);
});

// Generating Date:
const date = new Date();
const options = {
    year: "numeric",
    month: "short",
    day: "numeric"
};

DateSpan.textContent = `${date.toLocaleDateString("en-US", options)} / Austin, TX`;


// Generating a unique ticket ID:
const ticketId = `#${Array.from({length: 5}, ()=> Math.floor(Math.random() * 10)).join("")}`;
console.log(ticketId);