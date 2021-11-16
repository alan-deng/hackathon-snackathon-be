# Endpoints

Base URL: 

https://hackathon-snackathon.herokuapp.com

### `Show`
/recipes/:id (GET)

Request body: N/A

Response: Returns the recipe specified in params

### `Random Recipe`
/recipes/random (GET)

Request body: N/A

Response: Returns a single random recipe

### `Filtered Recipe`
/recipes/filtered (GET)

Request body: User inputted filters

Response: Returns a single recipe that meets the user's filters, using our recommendation engine

### `New Recipe`
/recipes (POST)

Request body: Recipe information + potentially sound recording and image (Ingredients list currently set up in model to be an array of objects, but final model unknown)

Reponse: Returns newly created recipe

### `Update Recipe`
/recipes/:id (PUT)

Request body: N/A

Reponse: Returns updated recipe

### `Delete Recipe`
/recipes/:id (DELETE)

Request body: N/A

Reponse: Returns deleted recipe