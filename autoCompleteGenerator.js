var pokemonList = [];
listUrl = "http://pokeapi.co/api/v2/pokemon/";
function pokemonFinder () {
    $.ajax({
        dataType: "JSON",
        method: "GET",
        url: listUrl,
        success: function (response) {

            for(var i = 0; i < response.results.length; i++){
                pokemonList.push(response.results[i].name)
                if (i === response.results.length -1 && response.next){
                    listUrl = response.next;
                    pokemonFinder();
                }
            }
        },
    });
}

pokemonFinder();