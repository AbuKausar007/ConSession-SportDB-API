const searchPlayers = () =>{
    document.getElementById('spinner').style.display = 'block';
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    
    // clear data
    searchField.value = '';
    if( searchText == '' || searchText == 'number'){
        alert('Please write player name.');
    }
    else{
    // load data
    const url = ` https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
    fetch(url)
    .then( res => res.json())
    .then( data => displaySearchPlayers(data.player));
    }
}

const displaySearchPlayers = players => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if( players.length == 0){
        alert('There is no player based on your search.');
    }
    players.forEach ( player => {
        //console.log(player);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${player.strThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Name: ${player.strPlayer}</h5>
                    <h6>Country: ${player.strNationality} Sport: ${player.strSport}</h6>
                    
                    <p class="card-text">${player.strDescriptionEN.slice(0,100)}</p>
                    <button class="btn btn-danger border-2" id="delete">Delete</button>
                    <button onclick="loadPlayerDetails('${player.idPlayer}')" class="btn btn-success border-2" id="details">Details</button>
                </div>
                </div>
            </div>
        </div>
        `
        searchResult.appendChild(div);
    })
}

const loadPlayerDetails = playerId => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
    .then( res => res.json())
    .then( data => displayPlayerDetails(data.players[0]));
}

const displayPlayerDetails = playerDetails => {
    console.log(playerDetails.strGender);
    if(playerDetails.strGender == 'Male'){
        document.getElementById('male').style.display = 'block';
        document.getElementById('female').style.display = 'none';
    }
    else{
        document.getElementById('male').style.display = 'none';
        document.getElementById('female').style.display = 'block';
    }
    const singlePlayerDetail = document.getElementById('player-details');
    singlePlayerDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card justify-content-center">
            <img src="${playerDetails.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${playerDetails.strPlayer}</h5>
            <p class="card-text">${playerDetails.strDescriptionEN.slice(0,250)}</p>
        </div>
    </div>
    `;
    singlePlayerDetail.appendChild(div);
} 