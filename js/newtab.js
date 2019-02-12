chrome.storage.local.get(
    ["opens", "lastOpen", "color", "emoji", "svg"],
    function(data) {
        window.svg = data.svg;
        document.body.style["background-color"] = data.color || "#212127";
        if (data.svg) {
            document.getElementsByClassName(
                "cat"
            )[0].innerHTML = `<img id="svg" src="assets/cat.svg" style="width: 0px" />`;
        } else {
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
    const newSize = 20 + newTotal * 2;
    if (window.svg) {
        document.getElementById("svg").style["width"] = newTotal * 7.5 + "px";
    } else {
        document.body.style["font-size"] = Math.min(newSize, 324) + "px";
    }
    document.getElementsByClassName("cat")[0].title =
        newTotal + " new tabs today";
    chrome.storage.local.set(
        { opens: newTotal, lastOpen: new Date().getDay() },
        function() {
            console.log("opens is set to " + newTotal);
        }
    );
};
