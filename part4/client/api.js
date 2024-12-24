document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const commentsList = document.getElementById('comments-list');

    async function fetchUsers() {
        try {
            const response = await axios.get('/api/users');
            const users = response.data;
            userList.innerHTML = users.map(user => `<li data-user-id="${user.id}">${user.name}</li>`).join('');
            userList.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', event => {
                const userId = event.target.getAttribute('data-user-id');
                fetchComments(userId);
            });
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    async function fetchComments(userId) {
        try {
            const response = await axios.get(`/api/user/${userId}/comments`);
            const comments = response.data;
            commentsList.innerHTML = '';
            comments.forEach(comment => {
                const li = document.createElement('li');
                li.textContent = comment.body;
                commentsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }
    fetchUsers();
});