var PokemonSearcher = function() {
    var self = this;
    var listUrl = "http://pokeapi.co/api/v2/pokemon/";
    var pokemonCount = 0;
    this.pokemonFinder = function () {
        $("#display").append($("<div>").text("Loading...").addClass("pokemonProfile"));
        $.ajax({
            dataType: "JSON",
            method: "GET",
            url: listUrl,
            success: function (response) {
                var pokemonInfo = "Could not find the pokemon. Try again.";
                for(var i = 0; i < response.results.length; i++){
                    pokemonCount++;
                    if(response.results[i].name === $("#searchInput").val().toLowerCase()){
                        pokemonInfo = response.results[i];
                        self.clearSearch();
                        self.getPokemonData(pokemonInfo.url);
                        break;
                    }
                    else if (i === response.results.length -1 && response.next){
                        listUrl = response.next;
                        self.pokemonFinder();
                    }
                    else if(pokemonCount === response.count){
                        self.clearSearch();
                        $("#display").append($("<div>").text(pokemonInfo).addClass("pokemonProfile"));
                    }
                    $("#display").empty();
                }
            },
        });
    };
    this.getPokemonData = function (url) {
        $("#display").append($("<div>").text("Loading...").addClass("pokemonProfile"));
        $.ajax({
            dataType: "JSON",
            method: "GET",
            url: url,
            success: function (response) {
                $("#display").empty();
                self.displayPokemon(response)
            },
        });
    };
    this.displayPokemon = function (pokemon) {
        console.log(pokemon);
        var pokemonProfile= $("<div>").addClass("pokemonProfile");
        var pokemonPictureHolder = $("<div>").addClass("imgContainer");
        var pokemonPicture = $("<img>").addClass("img-fluid");
        if(pokemon.sprites.front_default) {
            pokemonPicture.attr("src", pokemon.sprites.front_default).addClass("pokemonPicture");
            pokemonPictureHolder.append(pokemonPicture);
        }
        var pokemonName = $("<div>").text(pokemon.name).addClass('pokemonName');
        var pokemonHeight = $("<div>").text("Height: " + pokemon.height).addClass('pokemonHeight');
        var pokemonWeight = $("<div>").text("Weight: " + pokemon.weight).addClass('pokemonWeight');
        var pokemonStats = $("<div>").text("Stats: ").addClass("pokemonStats");
        for(var i = pokemon.stats.length -1; i >= 0; i--){
            pokemonStats.append($("<div>").text(pokemon.stats[i].stat.name + ': ' + pokemon.stats[i].base_stat));
        }
        var pokemonTypes = $("<div>").text("Type: ").addClass("pokemonType");
        for(var j = 0; j < pokemon.types.length; j++){
            pokemonTypes.append(pokemon.types[j].type.name);
        }
        pokemonProfile.append(pokemonName, pokemonPictureHolder, pokemonTypes, pokemonHeight, pokemonWeight, pokemonStats);
        $("#display").append(pokemonProfile);
    };
    this.clearSearch = function () {
        $("#searchInput").val('');
        $("#display").empty();
        pokemonCount = 0;
        listUrl = "http://pokeapi.co/api/v2/pokemon/";
    }
};

$(document).ready(function() {
    var pokemonSearch = new PokemonSearcher;
    $("#searchButton").on("click", pokemonSearch.pokemonFinder);
});