# Browser Game

### Project Structure

The Project is made using HTML, CSS, JAVASCRIPT following the OOP rules.
Working with the backend team we needed to get the data from the /choose/ api:

\
`{
  "username":"fakeuser",
  "token":"abcd.FAKETOKENnafk48598258gnfmn43849gnfureufjjurjru383574n3jkf",
  "prices":{"S":5,"C":2,"D":1},"F":[1,2,3],
  "budget":30,
  "planets":["Earth","Jupiter","Mars","Mercury","Neptune","Saturn","Uranus","Venus"]
}
`\

We use this data to create the battle__page.html where you can select the planet and the ship you want to add to your army.
We needed then to pass this JSON structure to the /battle/ API:

\
`{
"attacker":
  {
  "type":"Human",
  "username":"fakeuser",
  "army":{"S":0,"C":0,"D":0,"F":1},
  "planet":"Earth"
  },
"defender":
  {
  "type":"virtual",
  "username":"Computer1",
  "army":{"S":4,"C":2,"D":6,"F":3},
  "planet":"Venus"
  },
"token":"abcd.FAKETOKENnafk48598258gnfmn43849gnfureufjjurjru383574n3jkf"
}
`\

### OOP CLASSES

In the playerCompose.js file you can find the OOP structure with this classes in order to build up this JSON structure for the /battle/ api:

-This is the player Class which structure is going to match the JSON of the /battle/ api:
```
  class Player {
        constructor(type, username, planet) {
            this.type = type;
            this.username = username;
            this.army = {};
            this.planet = planet;
        }
  }
```

- This ComposeArmy is used to compose the army property object that’ll be put inside Player and is based on the budget and the army names provided by the backend (armySelection):
```
class ComposeArmy {
	    constructor(type, armySelection, budget, strategy) {
	        this.type = type;
	        this.armySelection = armySelection;
	        this.budget = budget;
	        this.strategy = strategy;
	        this.army = {};
	    }
}
```

-The last one is the GameBoard class with the two empty object where the players Object’ll be put into after filled. 
```
class GameBoard {
	    constructor() {
	        this.attacker = {};
	        this.defender = {};
	    }
}
```
The ComposeArmy class contain also a create method we used to generate the Human player army and the CPU one (random army).
We put into the attacker and defender empty object (properties of the GameBoard class) the two player instance with the data of the player (Human and Cpu). The token is passed to playGame method inside the gameBoard object.

