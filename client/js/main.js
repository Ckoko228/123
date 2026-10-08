const servicesContainer =
  document.getElementById('services-container');

async function loadServices() {
  try {
    const response = await fetch('/api/services');

    if (!response.ok) {
      throw new Error('Failed to load services');
    }

    const services = await response.json();

    renderServices(services);

  } catch (error) {
    console.error(error);

    servicesContainer.textContent =
      'Не удалось загрузить услуги.';
  }
}

function renderServices(services) {
  servicesContainer.innerHTML = '';

  if (services.length === 0) {
    servicesContainer.textContent =
      'Услуги пока не добавлены.';

    return;
  }

  services.forEach((service) => {
    const article = document.createElement('article');

    article.innerHTML = `
      <h3>${service.title}</h3>

      <p>${service.description}</p>
    `;

    servicesContainer.appendChild(article);
  });
}

loadServices();