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

const toggle = () => {
  const x = document.getElementById("rawtextdiv");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("copythat").innerText = "Copy that!";
  } else {
    render();
    x.style.display = "none";
    document.getElementById("copythat").innerText = "Edit";
  }
};

const render = () => {
  //Hide text box, change button text to "edit buttons"
  const rawText = document.getElementById("rawtext").value.trim();
  //   console.log(rawText);
  const arrayText = rawText.split("\n");
  // console.log(arrayText);
  const ul = document.querySelector("ul");
  ul.innerText = "";
  for (const element of arrayText) {
    if (element === "") {
      continue;
    }
    if (element[0] === "<" && element.slice(-1) === ">") {
      const allTextString = element.slice(1, -1);
      const allTextArr = allTextString.split(":");
      const command = allTextArr[0].toLowerCase();
      switch (command) {
        case "br":
          ul.appendChild(document.createElement("br"));
          ul.appendChild(document.createElement("br"));
          break;
        case "heading":
          const text = document.createElement("h4");
          text.innerText = allTextString.slice(8);
          ul.appendChild(text);
          break;
        case "title":
          const title = allTextString.slice(6);
          document.getElementById("title").innerText =
            "Quick Copy: " + title.trim();
          break;
        default:
          console.log("Invalid command");
          break;
      }
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
