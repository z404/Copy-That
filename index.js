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

let enabled = true;

const renderLine = (element) => {
  const ul = document.querySelector("ul");
  element = element.trim();
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
        text.innerText = allTextString.slice(8).trim();
        ul.appendChild(text);
        break;
      case "title":
        const title = allTextString.slice(6).trim();
        document.getElementById("title").innerText =
          "Copy That: " + title.trim();
        break;
      default:
        console.log("Invalid command");
        break;
    }
  } else {
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

const render = () => {
  const rawText = document.getElementById("rawtext").value.trim();
  const arrayText = rawText.split("\n");
  const ul = document.querySelector("ul");
  ul.innerText = "";
  for (let element of arrayText) {
    if (element === "") {
      continue;
    }
    renderLine(element);
  }
};

const toggle = () => {
  if (enabled) {
    const x = document.getElementById("rawtextdiv");
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("copythat").innerText = "Copy that!";
    } else {
      render();
      x.style.display = "none";
      document.getElementById("copythat").innerText = "Edit";
    }
  }
};

const example = () => {
  if (enabled) {
    enabled = false;
    const textStr = `<title: Comic Con tickets>
    <heading: John>
    John Wright
    25
    M
    <br>
    <heading: Tom>
    Tom Blue
    24
    XL
    `.trim();

    const ul = document.querySelector("ul");
    ul.innerText = "";
    //   document.getElementById("")
    const btns = document.querySelectorAll("button");
    document.getElementById("rawtext").value = "";
    const arrText = textStr.split("\n");
    const iterate = (current, final) => {
      if (current < final) {
        document.getElementById("rawtext").value +=
          arrText[current].trim() + "\n";
        renderLine(arrText[current]);
        setTimeout(() => {
          iterate(current + 1, final);
        }, 500);
      } else {
        enabled = true;
      }
    };
    iterate(0, arrText.length);
  }
};
