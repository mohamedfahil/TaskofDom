document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div");
    container.setAttribute("class", "container mt-5");
    document.body.appendChild(container);

    const h1 = document.createElement("h1");
    h1.textContent = "Calculator";
    h1.setAttribute("id", "title");
    h1.classList.add("text-center", "mb-4");
    container.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = "Use this Calculator";
    p.setAttribute("id", "description");
    p.classList.add("text-center", "mb-4");
    container.appendChild(p);

    const calculator = document.createElement("div");
    calculator.setAttribute("class", "calculator card mx-auto p-3 shadow");
    calculator.style.maxWidth = "400px";
    container.appendChild(calculator);

    const input = document.createElement("input");
    input.setAttribute("id", "result");
    input.setAttribute("readonly", true);
    input.setAttribute("class", "form-control mb-3");
    input.style.fontSize = "1.5rem";
    input.style.height = "50px";
    input.style.textAlign = "right";
    calculator.appendChild(input);

    const buttonsValue = ['AC', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '00', '.', '='];
    const buttonsId = ['clear', 'del', 'mod', 'div', '7', '8', '9', 'multi', '4', '5', '6', 'subtract', '1', '2', '3', 'add', '0', '00', 'dot', 'equal'];
    
    const buttons = document.createElement("div");
    buttons.setAttribute("class", "buttons d-flex flex-wrap");
    calculator.appendChild(buttons);

    buttonsValue.forEach((value, index) => {
        const btn = document.createElement("button");
        btn.textContent = value;
        btn.setAttribute("id", buttonsId[index]);
        btn.setAttribute("class", getClassForButton(value));
        btn.style.flex = "1 0 21%";
        btn.style.margin = "5px";
        buttons.appendChild(btn);
    });

    function getClassForButton(value) {
        switch (value) {
            case 'AC':
                return 'btn btn-danger';
            case 'DEL':
                return 'btn btn-warning';
            case '%':
                return 'btn btn-secondary';
            case '/':
            case '*':
            case '-':
            case '+':
                return 'btn btn-info';
            case '=':
                return 'btn btn-success flex-fill';
            default:
                return 'btn btn-light';
        }
    }

    const clearInput = () => input.value = '';
    const deleteLastChar = () => input.value = input.value.slice(0, -1);
    const calculateResult = () => {
        try {
            input.value = eval(input.value.replace(/[^-()\d/*+.%]/g, ''));
        } catch {
            input.value = "Error";
        }
    };

    const handleInput = (value) => {
        switch (value) {
            case 'AC':
                clearInput();
                break;
            case 'DEL':
                deleteLastChar();
                break;
            case '=':
                calculateResult();
                break;
            default:
                input.value += value;
        }
    };

    buttons.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            handleInput(event.target.textContent);
        }
    });

    document.addEventListener("keydown", (event) => {
        const keyMap = {
            'Enter': '=',
            'Backspace': 'DEL',
            'Escape': 'AC',
            '*': '*',
            '/': '/',
            '+': '+',
            '-': '-',
            '.': '.',
            '%': '%'
        };

        const key = keyMap[event.key] || event.key;

        if (buttonsValue.includes(key)) {
            handleInput(key);
        }
    });
});
