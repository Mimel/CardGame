# The representation of a card.
class Card
  constructor: (@name, @text, @powerCost) ->

  # IF this card would abnormally affect the game state on play, override this function.
  play: (state) ->
    return state

  # If this card would abnormally affect the game state on attack, override this function.
  attack: (target, state) ->
    return state

  # If this card would abnormally affect the game state on death, override this function.
  death: (state) ->
    return state

class Monster extends Card
  constructor: ->
    super 'Monster', 'Test Description', 3
