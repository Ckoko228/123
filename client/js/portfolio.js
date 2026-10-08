const projectsContainer =
  document.getElementById('projects-container');

async function loadProjects() {
  try {
    const response = await fetch('/api/projects');

    if (!response.ok) {
      throw new Error('Failed to load projects');
    }

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
      'Проекты пока не добавлены.';

    return;
  }

  projects.forEach((project) => {
    const article = document.createElement('article');

    let date = 'Не указана';

    if (project.completion_date) {
      date = new Date(
        project.completion_date
      ).toLocaleDateString('ru-RU');
    }

    article.innerHTML = `
      <h3>${project.title}</h3>

      <p>
        <strong>Категория:</strong>
        ${project.category}
      </p>

      <p>${project.description}</p>

      <p>
        <strong>Дата выполнения:</strong>
        ${date}
      </p>
    `;

    projectsContainer.appendChild(article);
  });
}

loadProjects();