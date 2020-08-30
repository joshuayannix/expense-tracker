const budgetController = (() => {
  const Item = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
  const data = {
    allItems: {
      housing: [],
      food: [],
      travel: [],
      entertainment: [],
      investments: [],
      other: [],
    }
  }

})();


const UIController = (() => {
  return {
    getInput: () => {
      return {
        type: document.querySelector('.add__type').value,
        description: document.querySelector('.add__description').value,
        value: document.querySelector('.add__value').value,
      }
    }
  }
})();

// Global App Controller
const controller = ((budgetCtrl, UICtrl) => {

  const setupEventListeners = () => {
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  }
  const ctrlAddItem = () => {
    // 1. Get the field input data
    let input = UICtrl.getInput();

    // 2. Add the item to the budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI

  };

  return {
    init: () => {
      console.log('application started')
      setupEventListeners();
    }
  }
    
})(budgetController, UIController);

controller.init()