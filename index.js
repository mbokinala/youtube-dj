console.log('hello!!');

$('#search').click((e) => {
    e.preventDefault();

    var searchQuery = $('#songName').val();
    $('#songName').val('');

    $.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=\"' + searchQuery + '\"&key=AIzaSyBuft9To-Dk6XyskIH-7rQRMw2Ipd6UJhs', (data) => {
        console.log(data.items[0].id.videoId);
        id = data.items[0].id.videoId;

        $.ajaxSetup({
            headers:{
               'X-RapidAPI-Host': 'getvideo.p.rapidapi.com',
               'X-RapidAPI-Key': 'cb5c43bf05msh7312d3a25e4985ep1654e5jsn0815b2e363f5'
            }
         });

         console.log('https://getvideo.p.rapidapi.com/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + id);

         $.get('https://getvideo.p.rapidapi.com/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + id, (result) => { 
            console.log('received api response');
            console.log(result);

            resultData = JSON.parse(result);
            
            console.log(resultData.streams[1]);

            $('#mainSource').attr('src', resultData.streams[1].url);
            document.getElementById('player').load();
        });
         
    });
});