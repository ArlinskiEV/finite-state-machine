class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
      this.config = config;
      this.states = [];
      this.states.unshift(config.initial);
      this.state = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.states.length > 0 ? this.states[this.state]:'';
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      //find state
        if (this.config.states[state] != null) {
          while (this.state != 0) {
            this.states.shift();
            this.state--;
          }
          this.states.unshift(state);
        } else throw new Error ('Error');

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (this.config.states[this.getState()].transitions[event] != null) {
        this.changeState(this.config.states[this.getState()].transitions[event]);
      } else throw new Error ('Error');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.states = [];
      this.states.unshift(this.config.initial);
      this.state = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var result =[];
      for (var st in this.config.states) {
        if ((!event)||(this.config.states[st].transitions[event] != null)) {
          result.push(st);
        }
      }
      return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.state < this.states.length - 1) {
        this.state++;
        return true;
      }
      return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.state == 0) return false;
      this.state--;
      return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      var temp = this.states[this.state];
      this.states = [];
      this.states.unshift(temp);
      this.state = 0;
    }

}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
