var PokemonSearcher = function() {
    var self = this;
    var listUrl = "http://pokeapi.co/api/v2/pokemon/";
    this.pokemonFinder = function () {
        $.ajax({
            dataType: "JSON",
            method: "GET",
            url: listUrl,
            success: function (response) {
                var pokemonInfo = "Could not find pokemon";
                for(var i = 0; i < response.results.length; i++){
                    if(response.results[i].name === $("#searchInput").val()){
                        pokemonInfo = response.results[i];
                        self.getPokemonData(pokemonInfo.url);
                        break;
                    }
                    else if (i === response.results.length -1 && response.next){
                        listUrl = response.next;
                        console.log(listUrl);
                        self.pokemonFinder();
                    }
                }
            },
        });
    };
    this.getPokemonData = function (url) {
        $.ajax({
            dataType: "JSON",
            method: "GET",
            url: url,
            success: function (response) {
                self.displayPokemon(response)
            },
        });
    };
    this.displayPokemon = function (pokemon) {
        var pokemonProfile= $("<div>").addClass("pokemonProfile");
        var pokemonPictureHolder = $("<div>").addClass("imgContainer");
        var pokemonPicture = $("<img>").addClass("img-fluid");
        pokemonPicture.attr("src", pokemon.sprites.front_default).addClass("animalPicture");
        pokemonPictureHolder.append(pokemonPicture);
        var pokemonName = $("<div>").text(pokemon.name).addClass('pokemonName');
        pokemonProfile.append(pokemonPictureHolder, pokemonName);
        $("#display").append(pokemonProfile);
    };
};

$(document).ready(function() {
    var pokemonSearch = new PokemonSearcher;
    $("#searchButton").on("click", pokemonSearch.pokemonFinder);
});