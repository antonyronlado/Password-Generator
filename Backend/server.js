const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ExcelJS = require('exceljs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { name, username, password, phone } = req.body;

  try {
    const workbook = new ExcelJS.Workbook();
    const filePath = './users.xlsx';

    try {
      await workbook.xlsx.readFile(filePath);
    } catch {
      workbook.addWorksheet('Users');
    }

    const sheet = workbook.getWorksheet('Users') || workbook.addWorksheet('Users');

    if (sheet.rowCount === 0) {
      sheet.columns = [
        { header: 'Full Name', key: 'name' },
        { header: 'Username', key: 'username' },
        { header: 'Password', key: 'password' },
        { header: 'Phone', key: 'phone' }
      ];
    }

    sheet.addRow({ name, username, password, phone });
    await workbook.xlsx.writeFile(filePath);

    res.status(200).json({ message: 'User logged in successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving to Excel.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
