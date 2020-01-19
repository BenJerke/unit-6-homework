            // Initial array of gifs
            var gifs = ["Spongebob", "Ren & Stimpy", "Fairly Odd Parents", "Aqua Teen Hunger Force"];
            console.log(gifs)
            
            // Render the results returned in the AJAX call 
            function displayGifInfo() {

              var gifsrch = $(this).attr("data-name").trim();
              console.log(gifsrch)
              var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + gifsrch + "&limit=30&api_key=dc6zaTOxFJmzC";

              // When we click a button, make an AJAX call to the Giphy API with the button text as a search parameter, and then render the gifs in the gif-display div. 
            
              $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
                //parse the response into variables
                console.log(response);
                console.log(response.data.length)
                for (i=0; i<response.data.length; i++){
                  //get the individual gifs from the JSON
                  var gifData = response.data[i];

                  //parse the gif data to get the bits we want to show
                  var gifURL = gifData.url;
                  var imgURL = gifData.images.fixed_height.url;
                  var rating = gifData.rating;

                  var gifDiv = $("<div class='gif'>");
                  var ratingp = $("<p>").text("Rating: " + rating);
                  var src = imgURL;


                  var gifDisp = $("<img>").attr({
                    "src": src,  
                    "data-state": "still", 
                    "data-still": imgURL,
                    "data-animate": gifURL,
                   });
                  
                   //sort into columns using the incrementer
                   if (i<9){
                      gifDiv.append(gifDisp);
                      gifDiv.append(ratingp);
                      $("#gif-display-col-1").prepend(gifDiv);
                   }

                   else if (i<18) {
                    gifDiv.append(gifDisp);
                    gifDiv.append(ratingp);
                    $("#gif-display-col-2").prepend(gifDiv);
                   }

                   else {
                    gifDiv.append(gifDisp);
                    gifDiv.append(ratingp);
                    $("#gif-display-col-3").prepend(gifDiv);
                   }
                  


                }
                
              
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

           $("img").on("click", function () {
              var state = $(this).attr("data-state");
          

          if (state === "still") {
            $(this).attr("data-state", "animate");

            var src = $(this).attr("data-animate");

            
            $(this).attr("src", src) 
            console.log("click registered")
          }

          else if (state === "animate") {
            $(this).attr("data-state", "still");

            var src = $(this).attr("data-still");

            console.log(src)
            $(this).attr("src", src) 
            console.log("click registered")
          };
        });
        
        




  


        renderButtons();