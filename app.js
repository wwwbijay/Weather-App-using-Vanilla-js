window.addEventListener('load', ()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            console.log(position);
            lat = position.coords.latitude;
            long = position.coords.longitude;

            let proxy = '';
            const endpoint = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${long}`;
            console.log(endpoint);
        
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '68d5aaaa3emsh19d4967d4fab744p1a4ad6jsn30b6fb59bc09',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };

            //make api call
            fetch(endpoint, options)
                .then(response => response.json())
                .then((result)=>{
                    console.log(result);
                    let location = result.location;
                    let current = result.current;

                    let wther_timezone = document.querySelector('.location-timezone');
                    let wther_address = document.querySelector('.location-address');
                    let wther_icon = document.querySelector('.location-icon');
                    let wther_degree = document.querySelector('.temperature-degree');
                    let wther_desc = document.querySelector('.temperature-description');

                    wther_timezone.innerText = location.tz_id;
                    wther_address.innerText = '( '+ location.name + ', ' + location.country + ' )';
                    wther_icon.innerHTML = `<img src="https://${current.condition.icon}" >`;
                    wther_desc.innerText = current.condition.text;
                    wther_degree.innerText = current.temp_c;

                })
                .catch(error => console.log('error', error));

            
            
                
        });
    }
});