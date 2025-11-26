class Project {
  constructor({ title, thumbnail, category }, index) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.category = category;
    this.index = index;
  }

  render() {
    const card = document.createElement('article');
    card.className = 'work-card';
    card.style.setProperty('--work-card-delay', `${this.index * 80}ms`);

    const figure = document.createElement('figure');
    figure.className = 'work-figure';

    const img = document.createElement('img');
    img.className = 'work-img';
    img.src = this.thumbnail;
    img.alt = `${this.title} ${this.category} thumbnail`;

    const meta = document.createElement('div');
    meta.className = 'work-meta';

    const titleEl = document.createElement('h4');
    titleEl.textContent = this.title;

    const categoryEl = document.createElement('span');
    categoryEl.className = 'work-category';
    categoryEl.textContent = this.category;

    figure.appendChild(img);
    meta.appendChild(titleEl);
    meta.appendChild(categoryEl);
    card.appendChild(figure);
    card.appendChild(meta);

    card.addEventListener('click', () => this.openModal());

    this.cardEl = card;
    return card;
  }

  openModal() {
    const { modal, image, title, tag, closeBtn } = Project.modalRefs || {};
    if (!modal) {
      return;
    }

    Project.lastFocusedElement = document.activeElement;

    image.src = this.thumbnail;
    image.alt = `${this.title} preview`;
    title.textContent = this.title;
    tag.textContent = this.category;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }

  static registerModalElements(refs) {
    Project.modalRefs = refs;
  }

  static closeModal() {
    const { modal, image } = Project.modalRefs || {};
    if (!modal || !modal.classList.contains('is-open')) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (image) {
      image.src = '';
    }

    if (Project.lastFocusedElement && typeof Project.lastFocusedElement.focus === 'function') {
      Project.lastFocusedElement.focus();
    }
    Project.lastFocusedElement = null;
  }
}

Project.modalRefs = null;
Project.lastFocusedElement = null;

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('works-gallery');
  const modal = document.getElementById('work-modal');
  const modalImg = document.getElementById('work-modal-image');
  const modalTitle = document.getElementById('work-modal-title');
  const modalTag = document.getElementById('work-modal-tag');
  const modalCloseBtn = document.getElementById('work-modal-close');

  if (!gallery || !modal || !modalImg || !modalTitle || !modalTag || !modalCloseBtn) {
    return;
  }

  Project.registerModalElements({
    modal,
    image: modalImg,
    title: modalTitle,
    tag: modalTag,
    closeBtn: modalCloseBtn
  });

  const worksData = [
    { title: 'Forgetting Week Poster', thumbnail: 'images/遗忘周.jpg', category: 'design' },
    { title: 'Best Friend Illustration', thumbnail: 'images/挚友.jpg', category: 'design' },
    { title: 'Butterfly Memory', thumbnail: 'images/失忆蝴蝶.jpg', category: 'photo' },
    { title: 'Visitors From Afar', thumbnail: 'images/天外来物.jpg', category: 'short film' },
    { title: 'Retro Poster IV', thumbnail: 'images/海报4.jpg', category: 'design' },
    { title: 'Retro Poster I', thumbnail: 'images/海报.jpg', category: 'design' },
    { title: 'Retro Poster III', thumbnail: 'images/海报3.jpg', category: 'design' },
    { title: 'Concept Illustration', thumbnail: 'images/插画.jpg', category: 'photo' },
    { title: 'Concept Illustration II', thumbnail: 'images/插画1.jpg', category: 'photo' },
    { title: 'AI Montage', thumbnail: 'images/AI.jpg', category: 'documentary' },
    { title: 'Miniature House', thumbnail: 'images/小房子.jpg', category: 'design' },
    { title: 'City Modeling', thumbnail: 'images/城市建模.jpg', category: 'documentary' }
  ];

  const projects = worksData.map((work, idx) => new Project(work, idx));
  projects.forEach((project) => gallery.appendChild(project.render()));

  modalCloseBtn.addEventListener('click', () => Project.closeModal());

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      Project.closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      Project.closeModal();
    }
  });
});
