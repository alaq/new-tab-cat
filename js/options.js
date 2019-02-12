const defaultColor = "#212127";
const defaultEmoji = "🐈";
const svgDefault = false;

const getCustomSettings = () => {
    let colorElement = document.getElementById("color-picker");
    let emojiElement = document.getElementById("emoji-input");
    let svgElement = document.getElementById("svg");

    chrome.storage.local.get(["color", "emoji", "svg"], function(data) {
        colorElement.value = data.color || defaultColor;
        emojiElement.value = data.emoji || defaultEmoji;
        svgElement.checked = data.svg || svgDefault;
    });

    let saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.addEventListener("click", function() {
        chrome.storage.local.set(
            {
                color: colorElement.value,
                emoji: emojiElement.value,
                svg: svgElement.checked,
            },
            function() {
                console.log(
                    "color is " +
                        colorElement.value +
                        ", and emoji is " +
                        emojiElement.value +
                        ", and svg is " +
                        svgElement.checked
                );
            }
        );
    });
    let resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    resetButton.addEventListener("click", reset);
    let resetCountButton = document.createElement("button");
    resetCountButton.innerHTML = "Reset count to 0";
    resetCountButton.addEventListener("click", resetCount);

    const buttonDiv = document.getElementById("button-div");

    buttonDiv.appendChild(saveButton);
    buttonDiv.appendChild(resetButton);
    buttonDiv.appendChild(resetCountButton);
};

const reset = () => {
    chrome.storage.local.set(
        { color: defaultColor, emoji: defaultEmoji },
        function() {
            let colorElement = document.getElementById("color-picker");
            let emojiElement = document.getElementById("emoji-input");
            let svgElement = document.getElementById("svg");
            colorElement.value = defaultColor;
            emojiElement.value = defaultEmoji;
            svgElement.checked = svgDefault;
        }
    );
    feedback("Reset to default values!");
};
const resetCount = () => {
    chrome.storage.local.set({ opens: 0 }, function() {
        console.log("Count reset to 0!");
    });
    feedback("Count reset to 0!");
};

const feedback = (msg) => {
    const feedbackDiv = document.getElementById("feedback-div");
    feedbackDiv.innerHTML = msg;
};

getCustomSettings();
