const cardElement = findElement<HTMLDivElement>('card');
const cardContainer = findElement<HTMLDivElement>('card-container');
const dayElement = findElement<HTMLSpanElement>('day');
const dateElement = findElement<HTMLSpanElement>('date');
const linkElement = findElement<HTMLAnchorElement>('card-link');
const previousBtn = findElement<HTMLButtonElement>('previous-feature');
const nextBtn = findElement<HTMLButtonElement>('next-feature');
const tagContainer = findElement<HTMLDivElement>('feature-tags');
const thumbnailElt = findElement<HTMLImageElement>('thumbnail');
const descriptionElement = findElement<HTMLParagraphElement>('feature-description');
const closeButton = findElement<HTMLButtonElement>('btn-close');
const maximizeBtn = findElement<HTMLButtonElement>('btn-maximize');

function findElement<T extends HTMLElement>(id: string): T {
    const result = document.getElementById(id) as T;
    if (!result) {
        throw new Error(`cannot find element ${id}`);
    }
    return result;
}

import { getFeaturedCategories, setActiveCategory } from "./search";

function formatDate(str: string | number | Date) {
    const date = new Date(str);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let monthString: string;
    switch (month) {
        // Months are 0-indexed
        case 8: monthString = 'septembre'; break;
        case 9: monthString = 'octobre'; break;
        case 10: monthString = 'novembre'; break;
        case 11: monthString = 'décembre'; break;
        default: throw new Error('invalid month');
    }

    return `${day} ${monthString} ${year}`;
}

function tag(name: string) {
    // <button class="category nourriture">nourriture</button>
    const elt = document.createElement('button');
    elt.className = "";
    elt.classList.add('toggle', 'category', name);
    elt.innerText = name;
    elt.onclick = function () { setActiveCategory(name); }

    return elt;
}

let fullScreen = false;

function toggleFullScreen() {
    fullScreen = !fullScreen;
    if (fullScreen) {
        cardContainer.classList.remove('minimize');
        cardContainer.classList.add('maximize');
    } else {
        cardContainer.classList.remove('maximize');
        cardContainer.classList.add('minimize');
    }
}

function showCard({
    title,
    date,
    tags,
    url,
    thumbnailUrl,
    description,
    onPrevious,
    onNext,
}) {
    cardElement.style.display = 'block';
    dayElement.innerText = title;
    dateElement.innerText = formatDate(date);
    descriptionElement.innerText = description;
    closeButton.onclick = function () { hideCard(); };
    maximizeBtn.onclick = function () { toggleFullScreen(); }

    previousBtn.disabled = onPrevious === undefined;
    previousBtn.onclick = onPrevious;
    nextBtn.onclick = onNext;
    nextBtn.disabled = onNext === undefined;

    thumbnailElt.src = thumbnailUrl;

    const featuredCategories = getFeaturedCategories();

    for (const child of [...tagContainer.childNodes]) {
        child.remove();
    }
    tags.forEach((t: any) => {
        if (featuredCategories.includes(t)) {
            tagContainer.appendChild(tag(t))
        }
    })
    linkElement.href = url;
}

function hideCard() {
    cardElement.style.display = 'none';
}

export {
    showCard,
    hideCard
}