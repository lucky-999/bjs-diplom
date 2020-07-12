const buttonExit = new LogoutButton();
buttonExit.action = () => ApiConnector.logout(() => {
    if (buttonExit) {
        document.location.reload(true);
    }
});

ApiConnector.current((args) => {
    if (args.success === true) {
        ProfileWidget.showProfile(args.data);
    } 
});

const currentRate = new RatesBoard();
function rate() {
    ApiConnector.getStocks((args) => {
        if (args.success === true) {
            currentRate.clearTable();
            currentRate.fillTable(args.data);
        }
    });
}
rate();
setInterval(rate(), 60000);

const money = new MoneyManager();
money.addMoneyCallback = (data) => ApiConnector.addMoney(data, (responce) => {
    if (responce.success === true) {
        ProfileWidget.showProfile(responce.data);
        money.setMessage(false, "Баланс успешно пополнен!");
    } else {
        money.setMessage(true, "Ошибка при пополнении счета!")
    }
});

money.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (responce) => {
    if (responce.success === true) {
        ProfileWidget.showProfile(responce.data);
        money.setMessage(false, "Валюта успешно конвертирована!");
    } else {
        money.setMessage(true, "Ошибка при конвертировании валюты!")
    }
});

money.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (responce) => {
    if (responce.success === true) {
        ProfileWidget.showProfile(responce.data);
        money.setMessage(false, "Валюта успешно переведена!");
    } else {
        money.setMessage(true, "Ошибка при переводе валюты!")
    }
});

const favorites = new FavoritesWidget();
ApiConnector.getFavorites((responce) => {
    if (responce.success === true) {
        favorites.clearTable();
        favorites.fillTable(responce.data);
        money.updateUsersList(responce.data);
    }
});

favorites.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (responce) => {
    if (responce.success === true) {
        favorites.clearTable();
        favorites.fillTable(responce.data);
        money.updateUsersList(responce.data);
        favorites.setMessage(false, "Пользователь успешно добавлен!");
    } else {
        favorites.setMessage(true, "При добавлении пользователя произошла ошибка!");
    }
});

favorites.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (responce) => {
    if (responce.success === true) {
        favorites.clearTable();
        favorites.fillTable(responce.data);
        money.updateUsersList(responce.data);
        favorites.setMessage(false, "Пользователь успешно удален!");
    } else {
        favorites.setMessage(true, "При удалении пользователя произошла ошибка!");
    }
});