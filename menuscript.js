function changeTheme(button) {

    for (let cell of document.getElementsByClassName("cellU")) {

        cell.classList.replace("colour" + theme, "colour" + button.id);
    }

    theme = button.id;
}

function changeDifficulty(btn) {

    document.getElementById("board").innerHTML = "";
    document.getElementsByClassName("selected")[0].classList.remove("selected");
    btn.classList.add("selected");

    switch (btn.innerHTML) {
        case "Beginner":
            document.getElementById("custom").style.display = "none";
            createTable(9,9,10);
            break;
        case "Intermediate":
            document.getElementById("custom").style.display = "none";
            createTable(16,16,40);
            break;
        case "Expert":
            document.getElementById("custom").style.display = "none";
            createTable(30,16,99);
            break;
        case "Custom":
            document.getElementById("custom").style.display = "flex";
            defaultBoard();
            break;
        case "Create":
            if (checkValidity(document.getElementById("width").value, document.getElementById("height").value, document.getElementById("mines").value)) {
                createTable(document.getElementById("width").value,document.getElementById("height").value,document.getElementById("mines").value);
            } else {
                defaultBoard();
            }
            break;
    }

}

document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("solverToggle").addEventListener("click", function() {
            solver = !(solver);
        })
});