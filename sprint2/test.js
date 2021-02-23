let url = 'https://api.football-data.org/v2/competitions/2014/matches';

fetch(url,
{
    method: 'GET',
    headers: { "X-Auth-Token": "3c3cf5121aca408783e167b985e62751"},
})
.then(response => {
    return response.json()
})
.then(data => {
    console.log(data.matches)
})