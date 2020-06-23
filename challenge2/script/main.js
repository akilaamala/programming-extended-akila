var date = new Date();
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var config = {
    'is_12_format': true,
    'theme': 2
};

/*function setFormat(bool) {
    config.is_12_format = bool;
    setTime();
}*/

/*function setGmt(bool) {
    config.is_gmt = bool;
    setTime();
}*/

function changeElementClass(element, from, to) {
    element.classList.remove(from);
    element.classList.add(to);
}

function setTheme(id) {
    if (id != config.theme) {
        if (id == 1) {
            document.querySelectorAll('.bg-dusk').forEach(element => {
                changeElementClass(element, 'bg-dusk', 'bg-dawn');
            });
            changeElementClass(document.querySelector("body"), 'text-dark', 'text-light');
        } else {
            document.querySelectorAll('.bg-dawn').forEach(element => {
                changeElementClass(element, 'bg-dawn', 'bg-dusk');
            });
            changeElementClass(document.querySelector("body"), 'text-dark', 'text-light');
        }
        config.theme = id;
    }
}




function setDate() {
    var day = date.getDate();
    var day_str = days[date.getDay()] + ",";
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    document.getElementById("date").innerText = "Today is: " + [day_str, month, day, year].join(" ");
}

function setTime() {
    date = new Date();
    if (config.is_gmt) {
       var hour = date.getUTCHours();
        var min = date.getUTCMinutes();
        var sec = date.getUTCSeconds();
    } else {
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
    }
    if (config.is_12_format) {
        var hour = (hour > 12) ? hour - 12 : hour;
        time_str = [hour, min, sec].join(':');
        time_str += (hour > 12) ? " PM" : " AM";
        /*time_str += (hours > 12) ? " Good Evening" : " Good Morning";*/
    } 


    setDate();
    document.getElementById('clock').innerText = time_str;
}

setInterval(setTime, 1000);