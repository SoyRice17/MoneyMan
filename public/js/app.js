const app = document.getElementById('app');

// 데이터 관리
let incomes = [];
let expenses = [];

function loadData() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            incomes = data.incomes || [];
            expenses = data.expenses || [];
            navigate(window.location.hash);
        });
}

function saveData() {
    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ incomes, expenses }),
    });
}

function renderHome() {
    return `
        <h2>환영합니다</h2>
        <p>당신의 재정을 스마트하게 관리하세요.</p>
    `;
}

function renderIncome() {
    return `
        <h2>수입 입력</h2>
        <form id="incomeForm">
            <input type="text" placeholder="수입 항목" required>
            <input type="number" placeholder="금액" required>
            <button type="submit">추가</button>
        </form>
        <h3>수입 목록</h3>
        <ul>
            ${incomes.map(income => `<li>${income.item}: ${income.amount}원</li>`).join('')}
        </ul>
    `;
}

function renderExpenses() {
    return `
        <h2>지출 입력</h2>
        <form id="expenseForm">
            <input type="text" placeholder="지출 항목" required>
            <input type="number" placeholder="금액" required>
            <button type="submit">추가</button>
        </form>
        <h3>지출 목록</h3>
        <ul>
            ${expenses.map(expense => `<li>${expense.item}: ${expense.amount}원</li>`).join('')}
        </ul>
    `;
}

function renderReport() {
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const balance = totalIncome - totalExpense;

    return `
        <h2>재정 보고서</h2>
        <p>총 수입: ${totalIncome}원</p>
        <p>총 지출: ${totalExpense}원</p>
        <p>잔액: ${balance}원</p>
    `;
}

function setupForm(formId, dataArray) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const item = form.elements[0].value;
        const amount = Number(form.elements[1].value);
        dataArray.push({ item, amount });
        saveData();
        navigate(window.location.hash);
    });
}

function navigate(route) {
    switch(route) {
        case '#home':
            app.innerHTML = renderHome();
            break;
        case '#income':
            app.innerHTML = renderIncome();
            setupForm('incomeForm', incomes);
            break;
        case '#expenses':
            app.innerHTML = renderExpenses();
            setupForm('expenseForm', expenses);
            break;
        case '#report':
            app.innerHTML = renderReport();
            break;
        default:
            app.innerHTML = renderHome();
    }
}

window.addEventListener('hashchange', () => navigate(window.location.hash));
navigate(window.location.hash || '#home');

// 페이지 로드 시 데이터 불러오기
loadData();
