const batches = [
    { id: 1, name: "Morning Batch", timing: "6:00 AM - 7:30 AM", fee: 2000 },
    { id: 2, name: "Mid Morning Batch", timing: "8:00 AM - 9:30 AM", fee: 2000 },
    { id: 3, name: "Late Morning Batch", timing: "10:00 AM - 11:30 AM", fee: 2000 },
    { id: 4, name: "Afternoon Batch", timing: "2:00 PM - 3:30 PM", fee: 2000 },
    { id: 5, name: "Evening Batch I", timing: "4:00 PM - 5:30 PM", fee: 2000 },
    { id: 6, name: "Evening Batch II", timing: "6:00 PM - 7:30 PM", fee: 2000 },
    { id: 7, name: "Weekend Morning", timing: "8:00 AM - 9:30 AM", fee: 2500 },
    { id: 8, name: "Weekend Afternoon", timing: "2:00 PM - 3:30 PM", fee: 2500 },
    { id: 9, name: "Weekend Evening", timing: "4:00 PM - 5:30 PM", fee: 2500 },
    { id: 10, name: "Special Batch", timing: "By Appointment", fee: 3000 }
];

function showSection(sectionId) {
    document.querySelectorAll('div[id]').forEach(div => div.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'batchSelection') {
        renderBatches();
    } else if (sectionId === 'paymentHistory') {
        renderPaymentHistory();
    } else if (sectionId === 'adminPanel') {
        renderAdminPanel();  // Call to render admin panel
    }
}


function renderBatches() {
    const container = document.querySelector('#batchSelection .grid');
    container.innerHTML = batches.map(batch => `
        <div class="bg-white p-6 rounded-lg shadow-md border border-[#B31312] card-hover">
            <h3 class="text-xl font-bold text-[#B31312]">${batch.name}</h3>
            <p class="text-gray-600 mt-2">${batch.timing}</p>
            <p class="text-lg font-bold text-[#B31312] mt-2">₹${batch.fee}</p>
            <button onclick="initiatePayment(${batch.id}, '${batch.name}', ${batch.fee})" 
                    class="w-full mt-4 bg-[#B31312] text-white py-2 rounded-lg hover:bg-red-700 transition duration-300">
                Pay Now
            </button>
        </div>
    `).join('');
}

function initiatePayment(batchId, batchName, amount) {
    const options = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
        amount: amount * 100,
        currency: 'INR',
        name: 'Chinmudra Academy',
        description: `Payment for ${batchName}`,
        handler: function(response) {
            handlePaymentSuccess(response, batchId, batchName, amount);
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}

function handlePaymentSuccess(response, batchId, batchName, amount) {
    alert('Payment Successful!');
    // Add payment to history
    const payment = {
        batchName: batchName,
        amount: amount,
        date: new Date().toLocaleDateString(),
        status: 'Success'
    };
    const history = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    history.push(payment);
    localStorage.setItem('paymentHistory', JSON.stringify(history));
}

function renderPaymentHistory() {
    const history = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    const tbody = document.getElementById('paymentHistoryBody');
    
    if(history.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="px-6 py-4 text-center text-gray-500 italic">
                    No payments made yet
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = history.map(payment => `
        <tr class="border-b">
            <td class="px-6 py-4">${payment.batchName}</td>
            <td class="px-6 py-4">₹${payment.amount}</td>
            <td class="px-6 py-4">${payment.date}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 rounded-full ${payment.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${payment.status}
                </span>
            </td>
        </tr>
    `).join('');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if(email && password) {
        document.getElementById('userName').textContent = email.split('@')[0];
        document.getElementById('navLinks').style.display = 'flex';
        showSection('dashboard');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if(password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    showSection('loginForm');
}

function logout() {
    document.getElementById('navLinks').style.display = 'none';
    showSection('loginForm');
}