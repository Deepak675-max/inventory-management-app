const axoisInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/81e2d1289cf54e00b6b2161439246353'
})

const myForm = document.querySelector('#my-form');
const itemName = document.querySelector('#item');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const quantity = document.querySelector('#quantity');
const itemList = document.querySelector('#item-list');

itemList.addEventListener('click', updateItem)


myForm.addEventListener('submit', addItem);

function showItem(items) {
    itemList.innerHTML = '';
    items.map(item => {
        const li = document.createElement('li');
        li.className = 'my-3';
        // Add text node with input values
        li.appendChild(document.createTextNode(`${item._id} - ${item.itemName} - ${item.description} - ${item.price} - ${item.quantity}`));

        var buyOneBtn = document.createElement('button');

        buyOneBtn.className = 'mx-2 buyOne';

        buyOneBtn.appendChild(document.createTextNode('Buy 1'));

        li.appendChild(buyOneBtn);

        var buyTwoBtn = document.createElement('button');

        buyTwoBtn.className = 'mx-1 buyTwo';

        buyTwoBtn.appendChild(document.createTextNode('Buy 2'));

        li.appendChild(buyTwoBtn);

        var buyThreeBtn = document.createElement('button');

        buyThreeBtn.className = 'mx-1 buyThree';

        buyThreeBtn.appendChild(document.createTextNode('Buy 3'));

        li.appendChild(buyThreeBtn);

        itemList.appendChild(li);

    })

}

window.addEventListener('DOMContentLoaded', getItem);

function deleteItem(id) {
    axoisInstance.delete(`/inventoryData/${id}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}


function updateItemData(data) {
    const item = {
        id: data[0],
        itemName: data[1],
        description: data[2],
        price: data[3],
        quantity: data[4]
    }
    axoisInstance.put(`/inventoryData/${item.id}`, item)
        .then(res => {
            getItem();
        })
        .catch(err => {
            console.log(err);
        })
}

function updateItem(e) {
    e.preventDefault();
    let data;
    if (e.target.classList.contains('buyOne')) {
        var li = e.target.parentElement;
        data = li.firstChild.textContent.split(' - ');
        if (parseInt(data[4]) >= 1) {
            data[4] = (parseInt(data[4]) - 1).toString();
        }
        else {
            alert("there are not enough item left to buy");
            return;
        }
        updateItemData(data);
    }
    else if (e.target.classList.contains('buyTwo')) {
        var li = e.target.parentElement;
        data = li.firstChild.textContent.split(' - ');
        if (parseInt(data[4]) >= 2) {
            data[4] = (parseInt(data[4]) - 2).toString();
        }
        else {
            alert("there are not enough item left to buy");
            return;
        }
        updateItemData(data);
    }
    else if (e.target.classList.contains('buyThree')) {
        var li = e.target.parentElement;
        data = li.firstChild.textContent.split(' - ');
        if (parseInt(data[4]) >= 3) {
            data[4] = (parseInt(data[4]) - 3).toString();
        }
        else {
            alert("there are not enough item left to buy");
            return;
        }
        updateItemData(data);
    }
}


function addItem(e) {
    e.preventDefault();

    if (itemName.value === "" || description.value === "" || price.value === "" || quantity.value === "") {
        alert("Please enter all the field");
        return;
    }
    const data = {
        itemName: itemName.value,
        description: description.value,
        price: price.value,
        quantity: quantity.value
    }

    axoisInstance.post('/inventoryData', data)
        .then(res => {
            getItem();
        })
        .catch(err => {
            console.log(err);
        })
}

function getItem() {
    axoisInstance.get('/inventoryData')
        .then(res => {
            showItem(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

