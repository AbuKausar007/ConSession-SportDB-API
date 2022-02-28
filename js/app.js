const searchPlayers = () =>{
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    searchField.value = '';
    const url = ` https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
    fetch(url)
    .then( res => res.json())
    .then( data => console.log(data.player));
}
