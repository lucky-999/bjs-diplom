"use strict"

const login = new UserForm();
login.loginFormCallback = (data) => {ApiConnector.login(data, (responce) => {
    if (!responce.success) {
        login.setLoginErrorMessage("Ошибка при авторизации!");
    } else {
        document.location.reload(true);
  }  
 });
}


login.registerFormCallback = (data) => {ApiConnector.register(data, (responce) => {
    if (!responce.success) {
        login.setRegisterErrorMessage("Ошибка при регистрации!");
    } else {
        document.location.reload(true);
    }
})}