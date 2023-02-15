const articlesDiv = document.getElementById('articles');

const url = 'https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed';


function displayArticles(articles) {
    articlesDiv.innerHTML = '';
    for (const article of articles) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => window.location = article.link);

        const image = document.createElement('img');
        image.src = article.jetpack_featured_media_url;
        image.alt = article.title.rendered;
        card.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = article.title.rendered;
        card.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `- By ${article.parselyMeta["parsely-author"][0]}`;
        author.classList.add('auth');
        card.appendChild(author);

        const date = document.createElement('p');
        const dateObj = new Date(article.date);
        date.textContent = `Published on ${dateObj.toDateString()}`;
        date.classList.add('date');
        card.appendChild(date);

        const excerpt = document.createElement('p');
        excerpt.innerHTML = article.excerpt.rendered;
        excerpt.classList.add('content');
        card.appendChild(excerpt);

        articlesDiv.appendChild(card);
    }
}


async function getArticles() {
    const response = await fetch(url);
    var data = await response.json();
    // console.log(data);
    displayArticles(data);
}




getArticles();