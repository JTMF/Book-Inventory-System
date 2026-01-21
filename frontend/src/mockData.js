// Temporary mock data for testing - DO NOT COMMIT
// Toggle USE_MOCK_DATA in Dashboard.js to switch between real and mock data

export const mockTransactions = [
  {
    _id: "mock_trans_1",
    item_name: "Harry Potter and the Philosopher's Stone",
    type: "in",
    qty: 5,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    createdBy: "john.doe@example.com",
    notes: "Restocking from supplier"
  },
  {
    _id: "mock_trans_2",
    item_name: "The Great Gatsby",
    type: "out",
    qty: 3,
    date: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    createdBy: "jane.smith@example.com",
    notes: "Customer purchase"
  },
  {
    _id: "mock_trans_3",
    item_name: "To Kill a Mockingbird",
    type: "in",
    qty: 10,
    date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    createdBy: "mike.wilson@example.com",
    notes: "New collection addition"
  },
  {
    _id: "mock_trans_4",
    item_name: "1984",
    type: "out",
    qty: 2,
    date: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    createdBy: "sarah.jones@example.com",
    notes: "Damaged stock removal"
  },
  {
    _id: "mock_trans_5",
    item_name: "Pride and Prejudice",
    type: "in",
    qty: 7,
    date: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    createdBy: "alex.martin@example.com",
    notes: "Donation received"
  }
]

export const mockStockTakes = [
  {
    _id: "mock_stock_1",
    item_name: "The Hobbit",
    qty: 15,
    location: "Shelf A1",
    notes: "Regular inventory check",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    createdBy: "emma.brown@example.com"
  },
  {
    _id: "mock_stock_2",
    item_name: "Lord of the Rings",
    qty: 8,
    location: "Shelf B3",
    notes: "Stock verification",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    createdBy: "david.lee@example.com"
  },
  {
    _id: "mock_stock_3",
    item_name: "The Catcher in the Rye",
    qty: 12,
    location: "Shelf C2",
    notes: "Monthly audit",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    createdBy: "lisa.taylor@example.com"
  },
  {
    _id: "mock_stock_4",
    item_name: "Brave New World",
    qty: 6,
    location: "Shelf A4",
    notes: "Low stock alert",
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
    createdBy: "robert.king@example.com"
  },
  {
    _id: "mock_stock_5",
    item_name: "Fahrenheit 451",
    qty: 9,
    location: "Shelf D1",
    notes: "Shelf reorganization",
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000), // 9 hours ago
    createdBy: "michael.white@example.com"
  }
]
