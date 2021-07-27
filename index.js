const copyTextToClipboard = (text) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand("copy");
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
};

const render = () => {
    //Hide text box, change button text to "edit buttons"
    const rawText = document.getElementById("rawtext").value.trim();
    console.log(rawText);
    const arrayText = rawText.split("\n");
    // console.log(arrayText);
    const ul = document.querySelector("ul");
    ul.innerText = "";
    for (const element of arrayText) {
        if (element === "") {
            continue;
        }
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.innerText = element;
        text.setAttribute("class", "text");
        const button = document.createElement("button");
        button.addEventListener("click", () => copyTextToClipboard(element));
        "btn btn-primary clipbutton"
        .split(" ")
            .forEach((cls) => button.classList.add(cls));
        button.innerText = "Copy that!";
        li.appendChild(text);
        li.appendChild(button);
        ul.appendChild(li);
    }
};