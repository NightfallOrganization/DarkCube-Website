



document.addEventListener("DOMContentLoaded", function() {
    const postId = window.location.hash.substring(1); // Holt die Blogpost-ID aus der URL

    fetch('blogData.json')
        .then(response => response.json())
        .then(data => {
            renderBlogList(data);

            // Wenn eine Post-ID in der URL vorhanden ist, den entsprechenden Post anzeigen
            if (postId) {
                const post = data.find(p => p.id === postId);
                if (post) {
                    showPost(post);
                }
            }
        });

    window.onpopstate = handlePopState;
});

function handlePopState(event) {
    if (event.state) {
        showPost(event.state);
    } else {
        fetch('blogData.json')
            .then(response => response.json())
            .then(data => {
                renderBlogList(data);
            });
    }
}

function renderBlogList(data) {
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = ''; // Leeren des Containers
    data.forEach(post => {
        const postElement = document.createElement('a');
        postElement.href = `#${post.id}`;
        postElement.classList.add('blog-entry');
        postElement.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-text">
                <div class="date">${post.date}</div>
                <h2>${post.title}</h2>
                <p>${post.subtitle}</p>
            </div>
        `;
        blogContainer.appendChild(postElement);
        postElement.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(post, post.title, `#${post.id}`);
            showPost(post);
        });
    });
}


function showPost(post) {
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = '';

    post.content.forEach(item => {
        let element = document.createElement('div');

        if (item.type === "date") {
            element.textContent = item.value;
            element.classList.add('blog-post-date');

        } else if (item.type === "texttitel") {
            element.innerHTML = item.value;
            element.classList.add('blog-post-texttitel');

        } else if (item.type === "textsubtitel") {
            element.innerHTML = item.value;
            element.classList.add('blog-post-textsubtitel');

        } else if (item.type === "textbold") {
            element.innerHTML = item.value;
            element.classList.add('blog-post-textbold');

        } else if (item.type === "textpoints") {
            element.innerHTML = item.value;
            element.classList.add('blog-post-textpoints');

        } else if (item.type === "text") {
            element.innerHTML = item.value;
            element.classList.add('blog-post-text');

        } else if (item.type === "video") {
            element = document.createElement('video');
            element.src = item.value;
            element.controls = true;
            element.classList.add('blog-post-video');

        } else if (item.type === "image") {
            element = document.createElement('img');
            element.src = item.value;
            element.classList.add('blog-post-image');
            element.addEventListener('click', function() {
                openLightbox(this.src);
            });
        }

        blogContainer.appendChild(element);
    });
}

function openLightbox(imageSrc) {
    document.getElementById('lightbox-image').src = imageSrc;
    document.getElementById('lightbox-overlay').style.display = 'flex';
}

document.getElementById('lightbox-overlay').addEventListener('click', function() {
    this.style.display = 'none';
});




window.onpopstate = function(event) {
    if (event.state) {
        showPost(event.state);
    } else {
        // Wenn kein Zustand vorhanden ist, Blogliste neu rendern
        fetch('blogData.json')
            .then(response => response.json())
            .then(data => {
                renderBlogList(data);
            });
    }
};




