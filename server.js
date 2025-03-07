const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, "public")));

// Endpoint untuk menampilkan halaman HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
