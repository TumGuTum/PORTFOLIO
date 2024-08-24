const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const body = document.body;

// Клонируем меню и добавляем его в попап один раз при загрузке страницы
const menu = document.querySelector("#menu").cloneNode(true);
popup.appendChild(menu);

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
}

// Закрытие попапа при клике на пункт меню
const links = Array.from(menu.children);

links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}

// Закрытие попапа при клике вне его области
document.addEventListener("click", function (e) {
  if (!popup.contains(e.target) && !hamb.contains(e.target)) {
    popup.classList.remove("open");
    hamb.classList.remove("active");
    body.classList.remove("noscroll");
  }
});


//ВОПРОСЫ
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const desc = item.querySelector('.accordion-item-desc');

        // Initialize the max-height based on the checkbox state
        if (checkbox.checked) {
            desc.style.maxHeight = desc.scrollHeight + 'px';
        } else {
            desc.style.maxHeight = '0';
        }

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                // Ensure smooth transition
                desc.style.transition = 'max-height 0.6s ease, padding 0.4s ease';
                desc.style.maxHeight = desc.scrollHeight + 'px';
            } else {
                // Ensure smooth transition
                desc.style.transition = 'max-height 0.6s ease, padding 0.6s ease';
                desc.style.maxHeight = '0';
            }
        });

        // Observe changes in the content and adjust max-height accordingly
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (checkbox.checked) {
                    desc.style.maxHeight = desc.scrollHeight + 'px';
                }
            }
        });

        observer.observe(desc);
    });
});

//скролл
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});





document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section, .skills-experience-container, .ac1, .contacts-section');
    const lastSection = document.querySelector('.contacts-section'); // Последняя секция
    const secondLastSection = document.querySelector('.ac1'); // Предпоследняя секция

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target); // Остановить наблюдение после появления
            }
        });
    }, {
        threshold: 0.1 // 10% элемента в области видимости, чтобы активировать
    });

    sections.forEach(section => {
        section.classList.add('section-hidden'); // Добавляем класс для скрытия
        observer.observe(section); // Наблюдаем за секцией
    });

    // Отдельный наблюдатель для предпоследней секции
    const lastObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lastSection.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    lastObserver.observe(secondLastSection); // Наблюдаем за предпоследней секцией
});