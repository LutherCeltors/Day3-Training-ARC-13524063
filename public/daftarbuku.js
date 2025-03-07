document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/api/daftarbuku")
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal mengambil data dari server.");
            }
            return response.json();
        })
        .then(data => {
            const bookList = document.getElementById("book-list");

            let html = "";
            data.forEach((book) => {
                html += `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.year}</td>
                        <td>${book.format} (${book.size_mb})</td>
                    </tr>
                `;
            });

            bookList.innerHTML = html;
        })
        .catch(error => console.error("Error saat mengambil data:", error));
});
