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
    },
    totals: {
      housing: 0,
      food: 0,
      travel: 0,
      entertainment: 0,
      investments: 0,
      other: 0,
    }
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
        value: document.querySelector('.add__value').value,
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
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type)

    //4. Clear the fields
    UICtrl.clearFields();

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