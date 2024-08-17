import { returnAPI } from "../api";
import Swal from 'sweetalert2';
import '../style.css';

const btn = document.querySelector('button');
const divBody = document.getElementById('body');
const section = document.querySelector('section');

function showSection() {
    section.classList.add('show');
}

function hideSection() {
    section.classList.remove('show');
}

btn.addEventListener('click', () => {
    const coin = document.querySelector('input').value.trim();
    
    if (coin !== '') {
        const API = returnAPI();
        const baseURL = `https://V6.exchangerate-api.com/v6/${API}/latest/${coin}`;
        console.log(baseURL);

        divBody.innerHTML = '';

        fetch(baseURL)
            .then((response) => response.json())
            .then((data) => {
                const rates = data.conversion_rates;

                if (rates && Object.keys(rates).length > 0) {
                    showSection();
                }

                for (const currency in rates) {
                    const rate = rates[currency];
                    const rateElement = document.createElement('p');
                    rateElement.textContent = `${currency}: ${rate}`;
                    divBody.appendChild(rateElement);
                }
            })
            .catch((error) => {
                console.log('Erro ao requerir informação!', error.message);
                Swal.fire({
                    title: 'Ops...',
                    text: 'Moeda não existente!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
                hideSection();
            });
    } else {
        Swal.fire({
            title: 'Aviso',
            text: 'Por favor, digite uma moeda antes de pesquisar.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        hideSection();
    }
});
