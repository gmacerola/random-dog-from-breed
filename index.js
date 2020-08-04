let dogBreed = "";
const initialClone = $(".initial").clone();
const resultsClone = $(".results").clone();
const restartClone = $(".restart").clone();

function getDogImages() {
  fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
    .then((response) => response.json())
    .then((responseJson) => displayResults(responseJson))
    .catch((error) => alert("Something went wrong! Try again later"));
}

function displayResults(responseJson) {
  console.log(responseJson.status);
  if (responseJson.status == "error") {
    console.log("It Worked");
    $(".results").removeClass("hidden");
    $(".results").html(`<h2>${dogBreed} is not a valid breed.`);
  } else {
    $(".results").removeClass("hidden");
    $(".breed").replaceWith(
      `<img src="${responseJson.message}" class="results-img">`
    );
  }
  $(".restart").removeClass("hidden");
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    dogBreed = $("#dogBreed").val();
    dogBreed = dogBreed.toLowerCase();
    getDogImages();
  });
}

function restart() {
  $(".restart").on("click", function (event) {
    $(".initial").replaceWith(initialClone);
    $(".results").replaceWith(resultsClone);
    $(".restart").addClass("hidden");
  });
}

$(function () {
  watchForm();
  restart();
});
