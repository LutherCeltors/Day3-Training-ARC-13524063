const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const fs = require("fs");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/daftarbuku", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "daftarbuku.html"));
})

app.get("/api/daftarbuku", (req, res) => {
    fs.readFile("books.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Gagal membaca file JSON" });
        }

        let books = JSON.parse(data);

        // 💡 **OLAH DATA SEBELUM DIKIRIM KE FRONTEND**
        const formattedBooks = books.map((book, index) => ({
            id: index + 1,
            title: book.title.toUpperCase(), // Buat judul kapital semua
            author: book.author || "Tidak diketahui", // Jika tidak ada author, ganti default
            year: book.year,
            format: book.format,
            size_mb: book.size_kb ? (book.size_kb / 1024).toFixed(2) + " MB" : "N/A" // Ubah ukuran dari KB ke MB
        }));

        res.json(formattedBooks); // Kirim data yang sudah diolah
    });
});


app.get("/kategori", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "kategori.html"));
})

app.get("/hubungikami", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "hubungikami.html"));
})

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
