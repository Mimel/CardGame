mysql = require 'mysql'

#Temporary local connection.
serverConn = mysql.createConnection {
  host:     '127.0.0.1',
  database: 'cardgame',
  user:     'root',
  password: ''
}

# The representation of a card.
class Card
  constructor: (@name, @text, @powerCost) ->

  # If this card would abnormally affect the game state on play, override this function.
  play: (state) ->
    return state

  # If this card would abnormally affect the game state on attack, override this function.
  attack: (target, state) ->
    return state

  # If this card would abnormally affect the game state on death, override this function.
  death: (state) ->
    return state

# Initialize card dictionary.
cardMappingTemplate = []
serverConn.query 'SELECT name, description, powercost FROM Card',
  (error, results, fields) ->
    if error
      console.log error
    else
      addCard = (card) ->
        cardMappingTemplate.push {
          name: card.name,
          card: new Card card.name, card.description, card.powercost
        }
      addCard card for card in results
    module.exports.cardtemplates = cardMappingTemplate

module.exports.Card = Card
