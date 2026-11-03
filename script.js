
const form = document.getElementById("feedback-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const message = document.getElementById("form-message");
const birthYear = document.getElementById("birth-year");

const specialNotes = document.getElementById("special-notes");
const characterCount = document.getElementById("character-count");

const openingStatus = document.getElementById("opening-status");
const themeBtn = document.getElementById("theme-btn");

const allBtn = document.getElementById("all-btn");
const drinksBtn = document.getElementById("drinks-btn");
const pastriesBtn = document.getElementById("pastries-btn");
const rows = document.querySelectorAll(".menu-row");

const items = document.querySelectorAll(".item");
const totalDisplay = document.getElementById("total");

const extraText = document.getElementById("extra-text");
const readMoreBtn = document.getElementById("read-more-btn");


// 1. Character Counter
specialNotes.addEventListener("input", function() {
    const remaining = 100 - specialNotes.value.length;

    characterCount.textContent =
        remaining + " characters remaining";
});


// 2. Cafe Opening Status
const currentHour = new Date().getHours();

if (currentHour >= 8 && currentHour < 22) {
    openingStatus.textContent = "We are Open!";
    openingStatus.style.color = "#43834a";
} else {
    openingStatus.textContent = "Closed - Open at 8 AM";
    openingStatus.style.color = "#c44940";
}


// 3. Feedback Form and Discounts
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = username.value.trim();
    const customerEmail = email.value.trim();
    const year = Number(birthYear.value);
    const currentYear = new Date().getFullYear();

    if (name === "" || customerEmail === "") {
        message.textContent = "Please fill out your username and email.";
        return;
    }

    if (
        birthYear.value.trim() === "" ||
        !Number.isInteger(year) ||
        year < 1900 ||
        year > currentYear
    ) {
        message.textContent = "Please enter a valid birth year.";
        return;
    }

    const age = currentYear - year;
    let discountMessage = "";

    if (age <= 18) {
        discountMessage = "You qualify for a student discount.";
    } else if (age >= 60) {
        discountMessage = "You qualify for a senior discount.";
    } else {
        discountMessage = "You do not qualify for a discount.";
    }

    message.textContent =
        "Thank you for visiting, " + name + "! " +
        discountMessage + " We will contact you at " +
        customerEmail + ".";

    message.style.color = "#43834a";
});


// 4. Light and Dark Mode
themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "Switch to Light Mode";
    } else {
        themeBtn.textContent = "Switch to Dark Mode";
    }
});


// 5. Calculate Order Total
function calculateTotal() {
    let total = 0;

    items.forEach(function(item) {
        if (item.checked) {
            total = total + Number(item.value);
        }
    });

    totalDisplay.textContent = "Total: $" + total;
}

items.forEach(function(item) {
    item.addEventListener("change", calculateTotal);
});


// 6. Filter Menu by Category
function filterMenu(category) {
    rows.forEach(function(row) {
        if (
            category === "All" ||
            row.dataset.category === category
        ) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });
}

allBtn.addEventListener("click", function() {
    filterMenu("All");
});

drinksBtn.addEventListener("click", function() {
    filterMenu("Drinks");
});

pastriesBtn.addEventListener("click", function() {
    filterMenu("Pastries");
});


// 7. Read More / Read Less
readMoreBtn.addEventListener("click", function() {
    if (extraText.hidden) {
        extraText.hidden = false;
        readMoreBtn.textContent = "Read Less";
    } else {
        extraText.hidden = true;
        readMoreBtn.textContent = "Read More";
    }
});
