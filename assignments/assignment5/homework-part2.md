### Node // Angular Project - DUE 3/06/2015 11:59pm

##### PART 2 - 60 pts

Adding new features to the web application built from Part 1.


##### Feature 1 - Switch Between Characters

The response from the ComicVine API is an array of character objects.  

 - Using this response - return the first object in the array as the main character searched.

 - Then display additional characters contain in the array as similar matches.

 - When the user clicks on the character's name, the selected character's name and description will now be displayed and replace the area where the main character was displayed.

Screen Shot - (https://github.com/cydneymikel/CS454/blob/master/Week8/feature1.jpg)


##### Feature 2 - Character Detail View

 - Add a detail button to the character search page.
 
 - When the user clicks the details button - they are taken to a new page which shows the full details of the character including - name, deck, origin, publisher, powers, friends, and enemies.

 - When a user clicks on a friend or enemy in the list - they are taken to the details page about that character.

*HINT* - In order to display details for the characters you will need to use a ComicVine api endpoint - to undertand the format - key api_detail_url that is returned in the search response.

Screen Shot - (https://github.com/cydneymikel/CS454/blob/master/Week8/feature2.jpg)