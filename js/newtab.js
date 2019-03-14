chrome.storage.local.get(
    ["opens", "lastOpen", "color", "emoji", "svg"],
    function(data) {
        window.svg = data.svg !== false;
        document.body.style["background-color"] = data.color || "#212127";
        if (!window.svg) {
            document.getElementsByClassName("cat")[0].innerHTML =
                data.emoji || "🐈";
        }
        if (
            !Number.isInteger(data.opens) ||
            data.lastOpen !== new Date().getDay()
        ) {
            updateOpens(0);
        } else {
            updateOpens(data.opens + 1);
        }
    }
);

const updateOpens = (newTotal) => {
    if (window.svg) {
        const svgSize = Math.max(newTotal * 7.5, 43);
        document.getElementById("svg").style["width"] = newTotal * 7.5 + "px";
    } else {
        const fontSize = 20 + newTotal * 2;
        document.body.style["font-size"] = Math.min(fontSize, 324) + "px";
    }
    document.getElementsByClassName("cat")[0].title =
        newTotal + " new tabs today";
    document.getElementById("svg").title = newTotal + " new tabs today";
    chrome.storage.local.set(
        { opens: newTotal, lastOpen: new Date().getDay() },
        function() {
            console.log("opens is set to " + newTotal);
        }
    );
};
