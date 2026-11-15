(() => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-message');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const button = form.querySelector('[type=submit]');
        const data = {
            name: form.querySelector('#name').value.trim(), phone: form.querySelector('#phone').value.trim(), email: form.querySelector('#email').value.trim(), service_type: form.querySelector('#service_type').value, message: form.querySelector('#message').value.trim(), personal_data_consent: form.querySelector('#personal_data_consent').checked
        }
            ;
        button.disabled = true;
        status.textContent = 'Отправляем заявку…';
        try {
            const response = await fetch('/api/contact', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }
                , body: JSON.stringify(data)
            }
            );
            const result = await response.json();
            if (!response.ok) throw Error(result.message || 'Не удалось отправить заявку');
            status.textContent = 'Спасибо! Ваша заявка отправлена.';
            form.reset()
        }
        catch (err) {
            status.textContent = err.message || 'Ошибка соединения. Попробуйте ещё раз.'
        }
        finally {
            button.disabled = false
        }

    }
    )
}
)();
