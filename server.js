const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// ---- Boot: create tables + seed default statuses ----
async function initDb() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);
  console.log('Database ready.');
}

// ---- Statuses ----
app.get('/api/statuses', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM statuses ORDER BY sort_order, name');
  res.json(rows);
});

app.post('/api/statuses', async (req, res) => {
  const { id, name, color, emoji } = req.body;
  await pool.query(
    'INSERT INTO statuses (id, name, color, emoji) VALUES ($1,$2,$3,$4)',
    [id, name, color, emoji || '🔘']
  );
  res.json({ ok: true });
});

app.delete('/api/statuses/:id', async (req, res) => {
  await pool.query('DELETE FROM statuses WHERE id=$1', [req.params.id]);
  await pool.query("UPDATE clients SET status='' WHERE status=$1", [req.params.id]);
  res.json({ ok: true });
});

// ---- Clients ----
app.get('/api/clients', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
  res.json(rows);
});

app.post('/api/clients', async (req, res) => {
  const { id, name, phone, device, status, date, amount, notes, regular } = req.body;
  await pool.query(
    `INSERT INTO clients (id, name, phone, device, status, entry_date, amount, notes, regular)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [id, name, phone, device, status, date || null, amount || null, notes, !!regular]
  );
  res.json({ ok: true });
});

app.put('/api/clients/:id', async (req, res) => {
  const { name, phone, device, status, date, amount, notes, regular } = req.body;
  await pool.query(
    `UPDATE clients SET name=$1, phone=$2, device=$3, status=$4, entry_date=$5,
     amount=$6, notes=$7, regular=$8 WHERE id=$9`,
    [name, phone, device, status, date || null, amount || null, notes, !!regular, req.params.id]
  );
  res.json({ ok: true });
});

app.delete('/api/clients/:id', async (req, res) => {
  await pool.query('DELETE FROM clients WHERE id=$1', [req.params.id]);
  res.json({ ok: true });
});

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Refillon CRM running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to init DB:', err);
    process.exit(1);
  });
