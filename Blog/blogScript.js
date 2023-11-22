


document.addEventListener("DOMContentLoaded", function() {
    fetch('blogData.json')
        .then(response => response.json())
        .then(data => {
            renderBlogList(data);
        });

    window.onpopstate = function(event) {
        if (event.state) {
            showPost(event.state);
        } else {
            fetch('blogData.json')
                .then(response => response.json())
                .then(data => {
                    renderBlogList(data);
                });
        }
    };
});

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
    blogContainer.innerHTML = post.content;
}

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
