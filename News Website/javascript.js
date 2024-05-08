const apiKey = "bcc7bfe70a3544f1b6f5ce8af9235dd9";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews('India'));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const response = await fetch(url + query + "&apiKey=" + apiKey);
    const data = await response.json();
    // console.log(data);
    if(!data.totalResults){
        document.getElementById('cards-container').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        return;
    }
    
    
    document.getElementById('error').style.display = 'none';
    document.getElementById('cards-container').style.display = 'flex';
    bindData(data.articles);
}

function bindData(articles){
    // console.log(articles);
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);

        // console.log(typeof cardClone);
        fillDataInCard(cardClone, article);

        cardsContainer.appendChild(cardClone);
    })

}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.getElementById('news-img');
    const newsTitle = cardClone.getElementById('news-title');
    const newsSource = cardClone.getElementById('news-source');
    const newsDesc = cardClone.getElementById('news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    });
    // console.log(date);
    newsSource.innerHTML = article.source.name + ' · ' + date;

    cardClone.firstElementChild.addEventListener('click', ()=> {
        window.open(article.url, '_blank');
    })
}

currActiveItem = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);

    currActiveItem?.classList.remove('active');
    currActiveItem = navItem;
    currActiveItem.classList.add('active');
}

const searchBtn = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchBtn.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query) return;
    currActiveItem?.classList.remove('active');
    fetchNews(searchText.value);
});
searchText.addEventListener('keyup', (event)=>{
    var query = null;
    if(event.keyCode === 13) query = searchText.value;
    if(!query) return;
    currActiveItem?.classList.remove('active');
    fetchNews(searchText.value);
});