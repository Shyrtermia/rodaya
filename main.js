document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  navigation.classList.toggle('is-open', isOpen);
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a') && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    document.querySelector(event.target.closest('a').hash)?.focus();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const categoryButtons = document.querySelectorAll('[data-filter]');
const equipmentCards = document.querySelectorAll('[data-category]');
const filterStatus = document.querySelector('#filter-status');

function filterEquipment(selectedButton) {
  const selectedCategory = selectedButton.dataset.filter;
  let visibleCount = 0;

  categoryButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button === selectedButton));
  });

  equipmentCards.forEach((card) => {
    const isVisible = selectedCategory === 'all' || card.dataset.category === selectedCategory;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  filterStatus.textContent = visibleCount === 1
    ? '1 equipo visible'
    : visibleCount + ' equipos visibles';
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => filterEquipment(button));
});
