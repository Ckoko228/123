
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const adminSection = document.getElementById('admin-section');
const loginMessage = document.getElementById('login-message');
const logoutButton = document.getElementById('logout-button');

const requestsContainer = document.getElementById('requests-container');

const projectForm = document.getElementById('project-form');
const projectIdInput = document.getElementById('project-id');
const projectTitleInput = document.getElementById('project-title');
const projectDescriptionInput = document.getElementById('project-description');
const projectCategoryInput = document.getElementById('project-category');
const projectDateInput = document.getElementById('project-date');
const projectMessage = document.getElementById('project-message');
const projectsContainer = document.getElementById('projects-container');
const projectCancelButton = document.getElementById('project-cancel-button');

const serviceForm = document.getElementById('service-form');
const serviceIdInput = document.getElementById('service-id');
const serviceTitleInput = document.getElementById('service-title');
const serviceDescriptionInput = document.getElementById('service-description');
const serviceMessage = document.getElementById('service-message');
const servicesContainerAdmin = document.getElementById('services-container-admin');
const serviceCancelButton = document.getElementById('service-cancel-button');

const pageForm = document.getElementById('page-form');
const pageIdInput = document.getElementById('page-id');
const pageTitleInput = document.getElementById('page-title');
const pageContentInput = document.getElementById('page-content');
const pageMessage = document.getElementById('page-message');
const pagesContainer = document.getElementById('pages-container');
const pageCancelButton = document.getElementById('page-cancel-button');

let token = localStorage.getItem('adminToken');


if (token) {
  showAdminPanel();
}


loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const result = await response.json();

    if (!response.ok) {
      loginMessage.textContent = result.message;
      return;
    }

    token = result.token;

    localStorage.setItem('adminToken', token);

    loginMessage.textContent = '';

    await showAdminPanel();

  } catch (error) {
    console.error(error);

    loginMessage.textContent =
      'Ошибка подключения к серверу';
  }
});


logoutButton.addEventListener('click', () => {
  localStorage.removeItem('adminToken');

  token = null;

  adminSection.hidden = true;
  loginSection.hidden = false;

  loginForm.reset();
});


async function showAdminPanel() {
  loginSection.hidden = true;
  adminSection.hidden = false;

  await loadRequests();
  await loadProjects();
  await loadServicesAdmin();
  await loadPagesAdmin();
}


// =========================
// ЗАЯВКИ
// =========================

async function loadRequests() {
  try {
    const response = await fetch('/api/contact', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('adminToken');

      token = null;

      adminSection.hidden = true;
      loginSection.hidden = false;

      loginMessage.textContent =
        'Сессия истекла. Войдите снова.';

      return;
    }

    const requests = await response.json();

    renderRequests(requests);

  } catch (error) {
    console.error(error);

    requestsContainer.textContent =
      'Не удалось загрузить заявки.';
  }
}


function renderRequests(requests) {
  requestsContainer.innerHTML = '';

  if (requests.length === 0) {
    requestsContainer.textContent =
      'Заявок пока нет.';

    return;
  }

  requests.forEach((request) => {
    const card = document.createElement('div');

    card.innerHTML = `
      <hr>

      <h3>Заявка #${request.id}</h3>

      <p><strong>Имя:</strong> ${request.name}</p>

      <p><strong>Телефон:</strong> ${request.phone}</p>

      <p><strong>Email:</strong> ${request.email}</p>

      <p><strong>Услуга:</strong> ${request.service_type}</p>

      <p><strong>Сообщение:</strong> ${request.message}</p>

      <p>
        <strong>Статус:</strong>

        <select
          class="status-select"
          data-id="${request.id}"
        >
          <option
            value="new"
            ${request.status === 'new' ? 'selected' : ''}
          >
            Новая
          </option>

          <option
            value="in_progress"
            ${request.status === 'in_progress' ? 'selected' : ''}
          >
            В работе
          </option>

          <option
            value="completed"
            ${request.status === 'completed' ? 'selected' : ''}
          >
            Завершена
          </option>
        </select>
      </p>
    `;

    requestsContainer.appendChild(card);
  });

  document
    .querySelectorAll('.status-select')
    .forEach((select) => {
      select.addEventListener('change', async () => {
        await updateStatus(
          select.dataset.id,
          select.value
        );
      });
    });
}


async function updateStatus(id, status) {
  try {
    const response = await fetch(
      `/api/contact/${id}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
    }

  } catch (error) {
    console.error(error);

    alert('Не удалось изменить статус.');
  }
}


// =========================
// ПРОЕКТЫ
// =========================

async function loadProjects() {
  try {
    const response = await fetch('/api/projects');

    const projects = await response.json();

    renderProjects(projects);

  } catch (error) {
    console.error(error);

    projectsContainer.textContent =
      'Не удалось загрузить проекты.';
  }
}


function renderProjects(projects) {
  projectsContainer.innerHTML = '';

  if (projects.length === 0) {
    projectsContainer.textContent =
      'Проектов пока нет.';

    return;
  }

  projects.forEach((project) => {
    const card = document.createElement('div');

    let projectDate = 'Не указана';

    if (project.completion_date) {
      projectDate =
        new Date(
          project.completion_date
        ).toLocaleDateString('ru-RU');
    }

    card.innerHTML = `
      <hr>

      <h3>${project.title}</h3>

      <p>${project.description}</p>

      <p>
        <strong>Категория:</strong>
        ${project.category}
      </p>

      <p>
        <strong>Дата:</strong>
        ${projectDate}
      </p>

      <button
        class="edit-project-button"
        data-id="${project.id}"
      >
        Редактировать
      </button>

      <button
        class="delete-project-button"
        data-id="${project.id}"
      >
        Удалить
      </button>
    `;

    projectsContainer.appendChild(card);
  });

  document
    .querySelectorAll('.edit-project-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const project = projects.find(
          (item) =>
            item.id == button.dataset.id
        );

        startProjectEdit(project);
      });
    });

  document
    .querySelectorAll('.delete-project-button')
    .forEach((button) => {
      button.addEventListener('click', async () => {
        await deleteProject(
          button.dataset.id
        );
      });
    });
}


projectForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = projectIdInput.value;

  const projectData = {
    title: projectTitleInput.value.trim(),
    description: projectDescriptionInput.value.trim(),
    category: projectCategoryInput.value.trim(),
    completion_date: projectDateInput.value || null,
    main_image: null
  };

  try {
    let response;

    if (id) {
      response = await fetch(
        `/api/projects/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(projectData)
        }
      );

    } else {
      response = await fetch(
        '/api/projects',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(projectData)
        }
      );
    }

    const result = await response.json();

    if (!response.ok) {
      projectMessage.textContent =
        result.message;

      return;
    }

    projectMessage.textContent =
      id
        ? 'Проект обновлён.'
        : 'Проект добавлен.';

    resetProjectForm();

    await loadProjects();

  } catch (error) {
    console.error(error);

    projectMessage.textContent =
      'Ошибка при сохранении проекта.';
  }
});


function startProjectEdit(project) {
  projectIdInput.value =
    project.id;

  projectTitleInput.value =
    project.title;

  projectDescriptionInput.value =
    project.description;

  projectCategoryInput.value =
    project.category;

  if (project.completion_date) {
    projectDateInput.value =
      project.completion_date.substring(0, 10);

  } else {
    projectDateInput.value = '';
  }

  projectCancelButton.hidden = false;

  projectMessage.textContent =
    `Редактирование проекта #${project.id}`;
}


projectCancelButton.addEventListener('click', () => {
  resetProjectForm();
});


function resetProjectForm() {
  projectForm.reset();

  projectIdInput.value = '';

  projectCancelButton.hidden = true;
}


async function deleteProject(id) {
  const confirmed =
    confirm('Удалить этот проект?');

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `/api/projects/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    await loadProjects();

  } catch (error) {
    console.error(error);

    alert('Не удалось удалить проект.');
  }
}


// =========================
// УСЛУГИ
// =========================

async function loadServicesAdmin() {
  try {
    const response = await fetch('/api/services');

    const services = await response.json();

    renderServicesAdmin(services);

  } catch (error) {
    console.error(error);

    servicesContainerAdmin.textContent =
      'Не удалось загрузить услуги.';
  }
}


function renderServicesAdmin(services) {
  servicesContainerAdmin.innerHTML = '';

  if (services.length === 0) {
    servicesContainerAdmin.textContent =
      'Услуг пока нет.';

    return;
  }

  services.forEach((service) => {
    const card = document.createElement('div');

    card.innerHTML = `
      <hr>

      <h3>${service.title}</h3>

      <p>${service.description}</p>

      <button
        class="edit-service-button"
        data-id="${service.id}"
      >
        Редактировать
      </button>

      <button
        class="delete-service-button"
        data-id="${service.id}"
      >
        Удалить
      </button>
    `;

    servicesContainerAdmin.appendChild(card);
  });

  document
    .querySelectorAll('.edit-service-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const service = services.find(
          (item) =>
            item.id == button.dataset.id
        );

        startServiceEdit(service);
      });
    });

  document
    .querySelectorAll('.delete-service-button')
    .forEach((button) => {
      button.addEventListener('click', async () => {
        await deleteService(
          button.dataset.id
        );
      });
    });
}


serviceForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = serviceIdInput.value;

  const serviceData = {
    title: serviceTitleInput.value.trim(),
    description: serviceDescriptionInput.value.trim(),
    image: null
  };

  try {
    let response;

    if (id) {
      response = await fetch(
        `/api/services/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(serviceData)
        }
      );

    } else {
      response = await fetch(
        '/api/services',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(serviceData)
        }
      );
    }

    const result = await response.json();

    if (!response.ok) {
      serviceMessage.textContent =
        result.message;

      return;
    }

    serviceMessage.textContent =
      id
        ? 'Услуга обновлена.'
        : 'Услуга добавлена.';

    resetServiceForm();

    await loadServicesAdmin();

  } catch (error) {
    console.error(error);

    serviceMessage.textContent =
      'Ошибка при сохранении услуги.';
  }
});


function startServiceEdit(service) {
  serviceIdInput.value =
    service.id;

  serviceTitleInput.value =
    service.title;

  serviceDescriptionInput.value =
    service.description;

  serviceCancelButton.hidden = false;

  serviceMessage.textContent =
    `Редактирование услуги #${service.id}`;
}


serviceCancelButton.addEventListener('click', () => {
  resetServiceForm();
});


function resetServiceForm() {
  serviceForm.reset();

  serviceIdInput.value = '';

  serviceCancelButton.hidden = true;
}


async function deleteService(id) {
  const confirmed =
    confirm('Удалить эту услугу?');

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `/api/services/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    await loadServicesAdmin();

  } catch (error) {
    console.error(error);

    alert('Не удалось удалить услугу.');
  }
}


// =========================
// СТРАНИЦЫ
// =========================

async function loadPagesAdmin() {
  try {
    const response = await fetch('/api/pages');

    const pages = await response.json();

    renderPagesAdmin(pages);

  } catch (error) {
    console.error(error);

    pagesContainer.textContent =
      'Не удалось загрузить страницы.';
  }
}


function renderPagesAdmin(pages) {
  pagesContainer.innerHTML = '';

  if (pages.length === 0) {
    pagesContainer.textContent =
      'Страниц пока нет.';

    return;
  }

  pages.forEach((page) => {
    const card = document.createElement('div');

    card.innerHTML = `
      <hr>

      <h3>${page.title}</h3>

      <p>
        <strong>Slug:</strong>
        ${page.slug}
      </p>

      <p>${page.content}</p>

      <button
        class="edit-page-button"
        data-id="${page.id}"
      >
        Редактировать
      </button>
    `;

    pagesContainer.appendChild(card);
  });

  document
    .querySelectorAll('.edit-page-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const page = pages.find(
          (item) =>
            item.id == button.dataset.id
        );

        startPageEdit(page);
      });
    });
}


function startPageEdit(page) {
  pageIdInput.value =
    page.id;

  pageTitleInput.value =
    page.title;

  pageContentInput.value =
    page.content;

  pageCancelButton.hidden = false;

  pageMessage.textContent =
    `Редактирование страницы: ${page.slug}`;
}


pageForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = pageIdInput.value;

  if (!id) {
    pageMessage.textContent =
      'Сначала выберите страницу.';

    return;
  }

  const pageData = {
    title: pageTitleInput.value.trim(),
    content: pageContentInput.value.trim()
  };

  try {
    const response = await fetch(
      `/api/pages/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(pageData)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      pageMessage.textContent =
        result.message;

      return;
    }

    pageMessage.textContent =
      'Страница обновлена.';

    resetPageForm();

    await loadPagesAdmin();

  } catch (error) {
    console.error(error);

    pageMessage.textContent =
      'Ошибка при обновлении страницы.';
  }
});


pageCancelButton.addEventListener('click', () => {
  resetPageForm();
});


function resetPageForm() {
  pageForm.reset();

  pageIdInput.value = '';

  pageCancelButton.hidden = true;
}
