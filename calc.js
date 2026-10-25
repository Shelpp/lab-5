/*jslint browser */

const QUANTITY_PATTERN = /^\d+$/;

function showError(message) {
    "use strict";
    const error = document.getElementById("quantity-error");
    const result = document.getElementById("result");
    error.textContent = message;
    error.hidden = false;
    result.hidden = true;
}

function hideError() {
    "use strict";
    const error = document.getElementById("quantity-error");
    error.textContent = "";
    error.hidden = true;
}

function onCalcClick(event) {
    "use strict";
    event.preventDefault();

    const input = document.getElementById("quantity");
    const select = document.getElementById("product");
    const result = document.getElementById("result");
    const text = input.value.trim();

    if (text === "") {
        showError("Введите количество товара.");
        return;
    }
    if (!QUANTITY_PATTERN.test(text)) {
        showError(
            "Недопустимые символы: количество должно состоять только из цифр."
        );
        return;
    }

    const quantity = parseInt(text, 10);
    if (quantity < 1) {
        showError("Количество должно быть больше нуля.");
        return;
    }

    const price = parseInt(select.value, 10);
    const total = price * quantity;
    const name = select.options[select.selectedIndex].text.split(" — ")[0];

    hideError();
    const totalText = total.toLocaleString("ru-RU");
    result.textContent = (
        `Стоимость заказа: ${totalText} ₽ (${name}, ${quantity} шт.)`
    );
    result.hidden = false;
}

window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const button = document.getElementById("calc-button");
    button.addEventListener("click", onCalcClick);
    document.getElementById("quantity").addEventListener("input", hideError);
});
