const budgetController = (() => {
  const Item = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  const calculateTotal = type => {
    let sum = 0;
    data.allItems[type].forEach(cur => {
      sum += cur.value;
    });
    data.totals[type] = sum;
  }

  const data = {
    allItems: {
      housing: [],
      food: [],
      travel: [],
      entertainment: [],
      investments: [],
      other: [],
    },
    totals: {
      housing: 0,
      food: 0,
      travel: 0,
      entertainment: 0,
      investments: 0,
      other: 0,
    },
    totalExpenses: 0,
    housing_percentage: -1,
    food_percentage: -1,
    travel_percentage: -1,
    entertainment_percentage: -1,
    investments_percentage: -1,
    other_percentage: -1,
  };

  return {
    addItem: (type, des, val) => {
      let ID, newItem;

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new Item
      newItem = new Item(ID, des, val);

      // Push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    calculateBudget: () => {
      // calculate totals for each category
      calculateTotal('housing');
      calculateTotal('food');
      calculateTotal('travel');
      calculateTotal('entertainment');
      calculateTotal('investments');
      calculateTotal('other');

      // calculate the final total expenses
      data.totalExpenses = data.totals.housing + data.totals.food + data.totals.travel + data.totals.entertainment + data.totals.investments + data.totals.other;

      // for each category total, calculate the percentage of total expenses 

      data.housing_percentage = Math.round((data.totals.housing / data.totalExpenses) * 100);
      data.food_percentage = Math.round((data.totals.food / data.totalExpenses) * 100);
      data.travel_percentage = Math.round((data.totals.travel / data.totalExpenses) * 100);
      data.entertainment_percentage = Math.round((data.totals.entertainment / data.totalExpenses) * 100);
      data.investments_percentage = Math.round((data.totals.investments / data.totalExpenses) * 100);
      data.other_percentage = Math.round((data.totals.other / data.totalExpenses) * 100);
    },

    getBudget: () => {
      return {
        // This is an object that gets passed into displayBudget method in UIController.

        totalExpenses: data.totalExpenses,

        // category totals
        housing: data.totals.housing,
        food: data.totals.food,
        travel: data.totals.travel,
        entertainment: data.totals.entertainment,
        investments: data.totals.investments,
        other: data.totals.other,

        //category percentages
        housing_percentage: data.housing_percentage,
        food_percentage: data.food_percentage,
        travel_percentage: data.travel_percentage,
        entertainment_percentage: data.entertainment_percentage,
        investments_percentage: data.investments_percentage,
        other_percentage: data.other_percentage,
      }
    },

    testing: () => {
      console.log(data)
    }
  };

})();


const UIController = (() => {
  return {
    getInput: () => {
      return {
        type: document.querySelector('.add__type').value,
        description: document.querySelector('.add__description').value,
        value: parseFloat(document.querySelector('.add__value').value),
      };
    },

    addListItem: (obj, type) => {
      let html = `
        <div class="item clearfix" id="${type}-${obj.id}">
          <div class="item__description">${obj.description}</div>
          <div class="right clearfix">
              <div class="item__value">${obj.value}</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
        </div>
      `
      let listType = document.querySelector(`.${type}__list`)
      listType.insertAdjacentHTML('beforeend', html)
    },

    clearFields: () => {
      let fields = document.querySelectorAll('.add__description' + ', ' + '.add__value');
      let fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach((current, index, array) => {
        current.value = '';
      });
      fieldsArr[0].focus();
    },

    displayBudget: obj => {
      document.querySelector('.expenses__value').textContent = '$' + obj.totalExpenses;
      
      //category values DOM
      document.querySelector('.expenses__housing--value').textContent = '$' + obj.housing;
      document.querySelector('.expenses__food--value').textContent = '$' + obj.food;
      document.querySelector('.expenses__travel--value').textContent = '$' + obj.travel;
      document.querySelector('.expenses__entertainment--value').textContent = '$' + obj.entertainment;
      document.querySelector('.expenses__investments--value').textContent = '$' + obj.investments;
      document.querySelector('.expenses__other--value').textContent = '$' + obj.other;

      // category percentage DOM
      if (obj.housing_percentage > 0) {
        document.querySelector('.expenses__housing--percentage').textContent = obj.housing_percentage + '%';
      } else {
        document.querySelector('.expenses__housing--percentage').textContent = '--%';
      }
      if (obj.food_percentage > 0) {
        document.querySelector('.expenses__food--percentage').textContent = obj.food_percentage + '%';
      } else {
        document.querySelector('.expenses__food--percentage').textContent = '--%';
      }
      if (obj.travel_percentage > 0) {
        document.querySelector('.expenses__travel--percentage').textContent = obj.travel_percentage + '%';
      } else {
        document.querySelector('.expenses__travel--percentage').textContent = '--%';
      }
      if (obj.entertainment_percentage > 0) {
        document.querySelector('.expenses__entertainment--percentage').textContent = obj.entertainment_percentage + '%';
      } else {
        document.querySelector('.expenses__entertainment--percentage').textContent = '--%';
      }
      if (obj.investments_percentage > 0) {
        document.querySelector('.expenses__investments--percentage').textContent = obj.investments_percentage + '%';
      } else {
        document.querySelector('.expenses__investments--percentage').textContent = '--%';
      }
      if (obj.other_percentage > 0) {
        document.querySelector('.expenses__other--percentage').textContent = obj.other_percentage + '%';
      } else {
        document.querySelector('.expenses__other--percentage').textContent = '--%';
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

  const updateBudget = () => {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. return the budget
    let totalExpenses = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(totalExpenses)
  };

  const ctrlAddItem = () => {
    // 1. Get the field input data
    let input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type)

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();
    }
    
  };

  return {
    init: () => {
      console.log('Application started')
      UICtrl.displayBudget({
        totalExpenses: 0,

        // category totals
        housing: 0,
        food: 0,
        travel: 0,
        entertainment: 0,
        investments: 0,
        other: 0,

        //category percentages
        housing_percentage: -1,
        food_percentage: -1,
        travel_percentage: -1,
        entertainment_percentage: -1,
        investments_percentage: -1,
        other_percentage: -1
        });
      setupEventListeners();
    }
  }
    
})(budgetController, UIController);

controller.init()