function sortObject(object){
    var sorted = {};
    var keys = Object.keys(object).sort();
    keys.forEach(key => {
        sorted[key] = object[key];
    });
    return sorted;
}

function convertToQuery(object){
    var query = '';
    var keys = Object.keys(object);
    keys.forEach((key, index, keys) => {
        query += key + '=' + object[key] + '&';
    });
    return query;
}

function getAsteroidData(){
    var d = new Date();
    var date = (d.getDate() < 10) ? '0'+d.getDate(): d.getDate();
    var month = ((d.getMonth()+1) < 10) ? '0'+(d.getMonth()+1): (d.getMonth()+1);
    var sd = d.getFullYear() + '-' + month + '-' + date;
    d.setDate(d.getDate() + 7);
    date = (d.getDate() < 10) ? '0'+d.getDate(): d.getDate();
    month = ((d.getMonth()+1) < 10) ? '0'+(d.getMonth()+1): (d.getMonth()+1);
    var ed = d.getFullYear() + '-' + month + '-' + date;
    var data = {
        start_date: sd ,
        end_date: ed,
        api_key: config.nasa.key
    };
    ajax({
        method: 'GET',
        url: config.nasa.endpoint + "?" + convertToQuery(data),
        onFinish: (response) => {
            var data = JSON.parse(response);
            var sorted = sortObject(data.near_earth_objects);
            document.querySelector('#asteroidCount').innerText = data.element_count;
            setAsteroidData(sorted)
        }
    });
}

function setAsteroidData(data){
    var html = '';
    var tableStart ='';
    var tableContent = '';
    var tableEnd = '</tbody></table></div>';
    var keys = Object.keys(data);
    keys.forEach( key => {
        var date = key;
        tableContent = '';
        data[date].forEach(asteroid => {
            var name = asteroid.name;
            var magnitude = asteroid.absolute_magnitude_h.toFixed(2);
            var diameter = (asteroid.estimated_diameter.meters.estimated_diameter_min + asteroid.estimated_diameter.meters.estimated_diameter_max);
            diameter = (diameter/2).toFixed(2);
            var dangerous = (asteroid.is_potentially_hazardous_asteroid) ? 'yes' : 'no';
            var velocity = parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2);
            tableContent += '<tr><td>'+name+'</td><td>'+magnitude+'</td><td>'+diameter+'</td><td>'+dangerous+'</td><td>'+velocity+'</td></tr>';
        });
        tableStart = '<li data-date="'+date+'">'+date+'</li><div class="asteroidTable hide" date="'+date+'"><table><thead><th>name</th><th>magnitude (h)</th><th>diameter (m)</th><th>dangerous</th><th>velocity (km/s)</th></thead><tbody>';
        html += tableStart + tableContent + tableEnd;
    });
    document.querySelector('#asteroid ul').innerHTML = html;
    document.querySelectorAll("#asteroid li").forEach(element => {
        element.onclick = function() {
            var table = document.querySelector('.asteroidTable[date="'+this.getAttribute('data-date')+'"]');
            if (table.classList.contains('hide')) {
                table.classList.remove('hide');
            }else{
                table.classList.add('hide');
            }
        };
    });
}

function setWeatherData(data){
    var statusImgUrl = config.weathericon.url + data.weather[0].icon + '@4x.png';
    document.querySelector('#weatherStatus img').setAttribute('src', statusImgUrl);
    document.querySelector('#weatherStatus span').innerText = data.weather[0].main;
    document.querySelector('#weatherStatus .label').innerText = "weather status " + data.weather[0].description;
    document.querySelector('#weatherTemperature').innerText = Math.floor(data.main.temp);
    document.querySelector('#weatherHumidity').innerText = data.main.humidity;
    document.querySelector('#weatherWindSpeed').innerText = Math.floor(data.wind.speed);
    document.querySelector('#weatherClouds').innerText = Math.floor(data.clouds.all);
    document.querySelector('#weatherVisibility').innerText = Math.floor(data.visibility);
}

function getWeather(){
    var data = {
        lon: config.data.location.lon,
        units: 'metric',
        lat: config.data.location.lat,
        appid: config.openweathermap.key
    };
    ajax({
        url: config.openweathermap.endpoint +'?'+ convertToQuery(data),
        onFinish: (response) => {
            var data = JSON.parse(response);
            setWeatherData(data);
        },
    });
}

function getAirQuality(){
    var data = {
        city: config.data.location.city,
        state: config.data.location.state,
        country: config.data.location.country,
        key: config.airvisual.key,
    };
    ajax({
        url: config.airvisual.endpoint + '?' + convertToQuery(data),
        onFinish: (response) => {
            var data = JSON.parse(response).data;
            document.querySelector('#airQuality').innerText = data.current.pollution.aqius;
        },
    });
}


function getSpotPreview(){
    var data = {
        access_token: config.mapbox.key,
        logo: false,
        attribution: false
    };
    var zoom = document.querySelector('form #zoom').value;
    var rotate = document.querySelector('form #rotate').value;
    var tilt = document.querySelector('form #tilt').value;
    var coordinate = config.data.location.lon + ',' + config.data.location.lat;
    var imageUrl = config.mapbox.endpoint + coordinate + ',' + zoom + ',' + rotate + ',' + tilt + '/600x600?' + convertToQuery(data);
    var imageHtml = '<img src="'+imageUrl+'" class="preview-image">';
    var image = document.querySelector('#previewImage');
    image.innerHTML = imageHtml;
    window.location = '#previewImage';
}

getAsteroidData();
getAirQuality();
getWeather();
getDisasterData();