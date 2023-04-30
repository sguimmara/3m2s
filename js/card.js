const cardElement = document.getElementById('card');
const dayElement = document.getElementById('day');
const dateElement = document.getElementById('date');
const linkElement = document.getElementById('card-link');
const tagContainer = document.getElementById('feature-tags');
const thumbnailElt = document.getElementById('thumbnail');
const descriptionElement = document.getElementById('feature-description');

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
    thumbnailUrl,
    description,
}) {
    cardElement.style.display = 'block';
    dayElement.innerText = title;
    dateElement.innerText = formatDate(date);
    descriptionElement.innerText = description;

    thumbnailElt.src = thumbnailUrl;

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