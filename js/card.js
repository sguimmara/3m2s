const cardElement = document.getElementById('card');
const dayElement = document.getElementById('day');
const dateElement = document.getElementById('date');
const titleElement = document.getElementById('card-title');
const subtitleElement = document.getElementById('card-subtitle');
const linkElement = document.getElementById('card-link');
const contentElement = document.getElementById('card-content');
const tagContainer = document.getElementById('feature-tags');

/**
 * @param {Date} date
 */
function formatDate(str) {
    const date = new Date(str);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let monthString;
    switch (month) {
        // Months are 0-indexed
        case 8: monthString = 'septembre'; break;
        case 9: monthString = 'octobre'; break;
        case 10: monthString = 'novembre'; break;
        case 11: monthString = 'décembre'; break;
    }

    return `${day} ${monthString} ${year}`;
}

function tag(name) {
    // <span class="category nourriture">nourriture</span>
    const span = document.createElement('span');
    span.classList = 'category ' + name;
    span.innerText = name;

    return span;
}

function showCard({
    title,
    date,
    tags,
    url,
}) {
    cardElement.style.display = 'block';
    dayElement.innerText = title;
    dateElement.innerText = formatDate(date);
    // subtitleElement.innerText = formatDate(date);
    for (const child of [...tagContainer.childNodes]) {
        child.remove();
    }
    tags.forEach(t => tagContainer.appendChild(tag(t)))
    linkElement.href = url;
}

function hideCard() {
    cardElement.style.display = 'none';
}

export {
    showCard,
    hideCard
}