const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    service_type: document.getElementById('service_type').value,
    message: document.getElementById('message').value.trim(),
    personal_data_consent:
      document.getElementById('personal_data_consent').checked
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      formMessage.textContent = result.message;
      return;
    }

    formMessage.textContent = 'Заявка успешно отправлена!';

    form.reset();

  } catch (error) {
    console.error(error);

    formMessage.textContent =
      'Не удалось отправить заявку. Попробуйте позже.';
  }
});