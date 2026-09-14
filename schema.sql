CREATE TABLE IF NOT EXISTS statuses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  emoji TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  device TEXT,
  status TEXT,
  entry_date DATE,
  amount NUMERIC,
  notes TEXT,
  regular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO statuses (id, name, color, emoji, sort_order) VALUES
  ('new_enquiry', 'New Enquiry', '#B8901A', '🟡', 1),
  ('quotation_sent', 'Quotation Sent', '#2F5F8A', '🔵', 2),
  ('followup', 'Follow-up Required', '#C1662B', '🟠', 3),
  ('order_confirmed', 'Order Confirmed', '#3E7D4B', '🟢', 4),
  ('service_pending', 'Service Pending', '#6B4C8A', '🟣', 5),
  ('completed', 'Completed', '#2E7D5B', '✅', 6),
  ('payment_pending', 'Payment Pending', '#B23B30', '🔴', 7)
ON CONFLICT (id) DO NOTHING;
