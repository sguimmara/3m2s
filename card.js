const cardElement = document.getElementById('card');
const titleElement = document.getElementById('card-title');
const subtitleElement = document.getElementById('card-subtitle');
const linkElement = document.getElementById('card-link');
const contentElement = document.getElementById('card-content');

/**
 * @param {Date} date
 */
function formatDate(date) {
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
    // <span class="badge rounded-pill text-bg-secondary">cuisine</span>
    const span = document.createElement('span');
    span.classList = 'badge m-1 rounded-pill text-sm text-bg-secondary';
    span.innerText = '#' + name;

    return span;
}

function showCard({
    title,
    date,
    tags,
    url,
}) {
    cardElement.style.display = 'block';
    titleElement.innerText = title;
    subtitleElement.innerText = formatDate(date);
    for (const child of [...contentElement.childNodes]) {
        child.remove();
    }
    tags.forEach(t => contentElement.appendChild(tag(t)))
    linkElement.href = url;
}

function hideCard() {
    cardElement.style.display = 'none';
}

export {
    showCard,
    hideCard
}