            // Initial array of gifs
            var gifs = ["Spongebob", "Ren & Stimpy", "Fairly Odd Parents", "Aqua Teen Hunger Force"];
            console.log(gifs)
            
            // Render the results returned in the AJAX call 
            function displayGifInfo() {

              var gif = $(this).attr("data-name");
              var queryURL = "https://api.giphy.com/v1/gifs/q=" + gif + "&limit=30&api_key=dc6zaTOxFJmzC";
              console.log(gif);
              // When we click a button, make an AJAX call to the Giphy API with the button text as a search parameter, and then render the gifs in the gif-display div. 
            
              $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
                //parse the response into variables
                console.log(response)
                

                //var gifDiv = $("<div class='gif'>");
                //var rating = response.rating
                //var ratingp = $("<p>").text("Rating: " + rating);
                //gifDiv.append(ratingp);
                //var gifURLStill = response.images.fixed_height_still.url
                //var gifURLAnimate = response.images.fixed_height.url
                //var src = gifURLStill;

                //render the response and add animation controls
                //var gifPic = $("<img>").attr({
                //  "src": src,  
                //  "data-state": "still", 
                //  "data-still": gifURLStill,
                //  "data-animate": gifURLAnimate,
                //  });

                //gifDiv.append(gifPic);
               // $("#gif-display-col1").prepend(gifDiv);
              });

            }
            

            function renderButtons() {


              $("#buttons-view").empty();

              // for each entry in the gif array, make a new button classed with gifbutton, and append it to the buttons-view div. 
              for (var i = 0; i < gifs.length; i++) {

                var a = $("<button>");

                a.addClass("gifbutton");
                a.attr("data-name", gifs[i]);
                a.text(gifs[i]);
                $("#buttons-view").append(a);
              }
            }



            $("#add-gif").on("click", function(event) {
              event.preventDefault();

              var gif = $("#gif-input").val().trim();

              gifs.push(gif);
              console.log(gifs);

              renderButtons();

            });

            $(document).on("click", ".gifbutton", displayGifInfo);

            



          //when a gif is clicked, play the gif if it's still, and pause the gif if it's playing. 

            function gifAnimate () {
              var state = $(this).attr("data-state");
          

          if (state === "still") {
            $(this).attr("data-state", "animate");

            var src = $(this).attr("data-animate");

            
            $(this).attr("src", src) 
            
          }

          else if (state === "animate") {
            $(this).attr("data-state", "still");

            var src = $(this).attr("data-still");

            console.log(src)
            $(this).attr("src", src) 
            
          };

        }
        renderButtons();