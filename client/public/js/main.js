console.log("im here");


// récupérer les données sur l'api : 
fetch('http://www.omdbapi.com/?s=star+wars&apikey=b83893b9')
    .then(function(response) {
        console.log(response);
        // response texte to json
        return response.json();

    })
    .then(function(myJson) {

        // pour chaque objet de la collection, ajouter un li via la fonction addTodo
        console.log(myJson.Search);
        // myJson.forEach(function(item) {
        //     console.log(item);
        myJson.Search.forEach(function(movie) {
        		console.log(movie);
                var source = document.getElementById("movieMain").innerHTML;
                var template = Handlebars.compile(source);
                var context = movie;
                var html = template(context);
                var container = document.getElementById("mainContainer");
                console.log(container);
                console.log(html);
                // console.log(t);
                var t = document.createElement("p");
                t.innerHTML = "sdfswfswf";

                container.insertAdjacentHTML('beforeend', html);
                // document.body.appendChild(html);

            })
            // });

    });