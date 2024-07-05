let searchInput = document.getElementById('search-input')


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(e){
        let lan =e.coords.latitude;
        let long =e.coords.longitude;
        getApi(`${lan},${long}`)
    })
}



async function getApi(city){
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=55b785ed7d5246448ef122705240307`)
    let data = await res.json()
    displayTodayWeather(data);
    dsiplayTomorowWeather(data)
    dsiplayAfterTomorowWeather(data)
}
getApi("damanhour")

searchInput.addEventListener('input',function(e){
    getApi(e.target.value) 
})


function displayTodayWeather(data){
    const todayDate1 =data.current.last_updated
    let date =new Date(todayDate1)
    const todayDay = date.toLocaleString('en-us',{weekday:"long"})
    const todayDate = date.getDate();
    const todayMonth =date.toLocaleString('en-us',{month:'long'})
    todayName.innerHTML=todayDay;
    todayDatee.innerHTML=`${todayDate} ${todayMonth}`
    const name = data.location.name
    const temp = `${data.current.temp_c}`
    const status =data.current.condition.text
    const Img = data.current.condition.icon
    const hummedity = data.current.humidity
    todayHummedity.innerHTML = hummedity
    const wind = data.current.wind_kph
    todayWind.innerHTML =wind
    const windDir = data.current.wind_dir
    todayWindDir.innerHTML =windDir
    todayImg.setAttribute('src',Img)
    todayStatus.innerHTML = status
    todayCity.innerHTML =name;
    firstDegree.innerHTML = temp;
}
function dsiplayTomorowWeather(data){
    const tomorowDayy = data.forecast.forecastday[1].date
    let tomorowdate = new Date(tomorowDayy)
    const tomorowDay1 =tomorowdate.toLocaleString('en-us',{weekday:'long'})
    const tomorowDate2 = tomorowdate.getDate();
    const tomorowMonth =tomorowdate.toLocaleString('en-us',{month:'long'})
    tomorowDay.innerHTML =tomorowDay1
    tomorowDate.innerHTML = `${tomorowDate2} ${tomorowMonth}`
    const tomorowDeg = data.forecast.forecastday[1].day.maxtemp_c
    secondDegree.innerHTML = tomorowDeg
    const tomorowImg = data.forecast.forecastday[1].day.condition.icon
    secoundImg.setAttribute('src',tomorowImg)
    const status =data.forecast.forecastday[1].day.condition.text
    tomorowStatus.innerHTML = status
    const minTemp = data.forecast.forecastday[1].day.mintemp_c
    tomorowMinTemp.innerHTML= minTemp

}
function dsiplayAfterTomorowWeather(data){
    const afterTomorowDayy = data.forecast.forecastday[2].date
    let date = new Date(afterTomorowDayy)
    tomorowDay2 =date.toLocaleString('en-us',{weekday:'long'})
    tomorowDatee = `${date.getDate()} ${date.toLocaleString('en-us',{month:'long'})}`
    aftertomorowDay.innerHTML =tomorowDay2
    aftertomorowDate.innerHTML =tomorowDatee
    const aftertomorowDegree = data.forecast.forecastday[2].day.maxtemp_c
    afterTomorowDeg.innerHTML = aftertomorowDegree
    const aftertomorowImgage = data.forecast.forecastday[2].day.condition.icon
    afterTomorowImg.setAttribute('src',aftertomorowImgage) 
    const status =data.forecast.forecastday[2].day.condition.text
    afterTomorowStatus.innerHTML = status
    const minTemp = data.forecast.forecastday[2].day.mintemp_c
    afterTomorowMinTemp.innerHTML= minTemp


}
