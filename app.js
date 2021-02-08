const search = document.getElementById('search');
search.addEventListener('click', function () {
    const cuisineName = document.getElementById('cuisineInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ cuisineName }`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('cuisines').innerHTML = "";
            document.getElementById('cuisinesData').innerHTML = ' ';
            const cuisines = document.getElementById('cuisines');
            data.meals.forEach(element => {
                const cuisine = document.createElement('div')
                cuisine.innerHTML = `
            <img src="${ element.strMealThumb }" onClick="handlecuisineClick(${ element.idMeal })">
            <h1 onClick="handlecuisineClick(${ element.idMeal })" >${ element.strMeal }</h1>
            `;
                cuisine.className = "card";
                cuisines.appendChild(cuisine);
            });
        })
        .catch(error => {
            console.log(error);
            document.getElementById('cuisines').innerHTML = "";
            document.getElementById('cuisinesData').innerHTML = ' ';
            const cuisines = document.getElementById('cuisines');
            const notFound = document.createElement('h1')
            notFound.innerHTML = `Sorry this item not found...Try again!`;
            cuisines.appendChild(notFound);
        })
})

let handlecuisineClick = cuisineId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ cuisineId }`)
        .then(res => res.json())
        .then(data => {
            let cuisineData = document.getElementById('cuisinesData');
            document.getElementById('cuisinesData').innerHTML = ' ';
            document.getElementById('cuisinesData').style.display = 'block';
            let cuisineDetails = document.createElement('div')
            cuisineDetails.innerHTML = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1>
            <br>
            <h1>Category: ${ data.meals[0].strCategory }</h1>
            <br>
            <h3>✅ ${ data.meals[0].strIngredient1 }</h3>
            <h3>✅ ${ data.meals[0].strIngredient2 }</h3>
            <h3>✅ ${ data.meals[0].strIngredient3 }</h3>
            <h3>✅ ${ data.meals[0].strIngredient4 }</h3>
            <h3>✅ ${ data.meals[0].strIngredient5 }</h3>
            `;
            cuisineDetails.className = "cuisine-details";
            cuisineData.appendChild(cuisineDetails);
        })
}