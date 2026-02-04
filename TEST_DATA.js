const testUsers = {
  supervisor: {
    email: "supervisor@inventory.com",
    password: "SupervisorPassword123!",
    role: "supervisor",
    description: "Full access to all system features including user management"
  },
  operators: [
    {
      email: "operator1@inventory.com",
      password: "OperatorPass123!",
      role: "operator",
      description: "Can create transactions and participate in stock takes"
    },
    {
      email: "operator2@inventory.com",
      password: "OperatorPass123!",
      role: "operator",
      description: "Can create transactions and participate in stock takes"
    },
    {
      email: "john.doe@inventory.com",
      password: "JohnDoe123!",
      role: "operator",
      description: "Can create transactions and participate in stock takes"
    }
  ]
};

const testLocations = [
  {
    location_name: "Main Warehouse",
    description: "Primary storage location for all inventory"
  },
  {
    location_name: "Storage Room A",
    description: "Secondary storage for overflow inventory"
  },
  {
    location_name: "Storage Room B",
    description: "Climate controlled storage for delicate items"
  },
  {
    location_name: "Receiving Dock",
    description: "Inbound shipment processing area"
  },
  {
    location_name: "Shipping Dock",
    description: "Outbound shipment staging area"
  },
  {
    location_name: "Shelf A1",
    description: "Display shelf section A, level 1"
  },
  {
    location_name: "Shelf B2",
    description: "Display shelf section B, level 2"
  },
  {
    location_name: "Display Area",
    description: "Front-of-store display area for featured books"
  }
];

const testItems = [
  { item_name: "The Great Gatsby", sku: "BOOK-001" },
  { item_name: "To Kill a Mockingbird", sku: "BOOK-002" },
  { item_name: "1984", sku: "BOOK-003" },
  { item_name: "Pride and Prejudice", sku: "BOOK-004" },
  { item_name: "The Catcher in the Rye", sku: "BOOK-005" },
  { item_name: "Brave New World", sku: "BOOK-006" },
  { item_name: "Jane Eyre", sku: "BOOK-007" },
  { item_name: "Wuthering Heights", sku: "BOOK-008" },
  { item_name: "The Lord of the Rings", sku: "BOOK-009" },
  { item_name: "Harry Potter and the Sorcerer's Stone", sku: "BOOK-010" },
  { item_name: "The Hobbit", sku: "BOOK-011" },
  { item_name: "Moby Dick", sku: "BOOK-012" }
];

const testTransactions = {
  inbound: [
    {
      type: "inbound",
      item_name: "The Great Gatsby",
      quantity: 20,
      pricePerUnit: 12.99,
      to_location: "Main Warehouse",
      notes: "New shipment received from supplier",
      date: new Date("2026-01-20")
    },
    {
      type: "inbound",
      item_name: "To Kill a Mockingbird",
      quantity: 15,
      pricePerUnit: 14.99,
      to_location: "Main Warehouse",
      notes: "Restock order",
      date: new Date("2026-01-21")
    },
    {
      type: "inbound",
      item_name: "1984",
      quantity: 25,
      pricePerUnit: 13.99,
      to_location: "Receiving Dock",
      notes: "Bulk purchase from distributor",
      date: new Date("2026-01-22")
    },
    {
      type: "inbound",
      item_name: "Pride and Prejudice",
      quantity: 10,
      pricePerUnit: 11.99,
      to_location: "Main Warehouse",
      notes: "New edition release",
      date: new Date("2026-01-23")
    },
    {
      type: "inbound",
      item_name: "The Catcher in the Rye",
      quantity: 18,
      pricePerUnit: 12.99,
      to_location: "Storage Room A",
      notes: "Supplier restock",
      date: new Date("2026-01-24")
    },
    {
      type: "inbound",
      item_name: "Harry Potter and the Sorcerer's Stone",
      quantity: 30,
      pricePerUnit: 15.99,
      to_location: "Main Warehouse",
      notes: "High demand item restocked",
      date: new Date("2026-01-25")
    }
  ],
  outbound: [
    {
      type: "outbound",
      item_name: "The Great Gatsby",
      quantity: 5,
      pricePerUnit: 12.99,
      from_location: "Main Warehouse",
      notes: "Order #ORD001 shipped",
      date: new Date("2026-01-24")
    },
    {
      type: "outbound",
      item_name: "To Kill a Mockingbird",
      quantity: 3,
      pricePerUnit: 14.99,
      from_location: "Main Warehouse",
      notes: "Customer order",
      date: new Date("2026-01-25")
    },
    {
      type: "outbound",
      item_name: "The Catcher in the Rye",
      quantity: 8,
      pricePerUnit: 12.99,
      from_location: "Shelf A1",
      notes: "Bulk sale to bookstore",
      date: new Date("2026-01-26")
    },
    {
      type: "outbound",
      item_name: "Harry Potter and the Sorcerer's Stone",
      quantity: 12,
      pricePerUnit: 15.99,
      from_location: "Display Area",
      notes: "Holiday promotion order",
      date: new Date("2026-01-27")
    },
    {
      type: "outbound",
      item_name: "1984",
      quantity: 7,
      pricePerUnit: 13.99,
      from_location: "Receiving Dock",
      notes: "University bulk order",
      date: new Date("2026-01-27")
    },
    {
      type: "outbound",
      item_name: "Pride and Prejudice",
      quantity: 4,
      pricePerUnit: 11.99,
      from_location: "Main Warehouse",
      notes: "Retail customer purchase",
      date: new Date("2026-01-28")
    },
    {
      type: "outbound",
      item_name: "The Great Gatsby",
      quantity: 3,
      pricePerUnit: 12.99,
      from_location: "Shelf B2",
      notes: "Book club order",
      date: new Date("2026-01-28")
    },
    {
      type: "outbound",
      item_name: "The Hobbit",
      quantity: 6,
      pricePerUnit: 14.99,
      from_location: "Display Area",
      notes: "Themed display clearance",
      date: new Date("2026-01-28")
    }
  ]
};

const testStockTakes = [
  {
    stock_take_name: "Monthly Stock Take - January Week 1",
    location: "Main Warehouse",
    status: "Completed",
    notes: "Regular monthly audit - Main Warehouse section",
    items: [
      {
        item_name: "The Great Gatsby",
        expected_quantity: 15,
        counted_quantity: 15,
        variance: 0,
        notes: "Count verified by supervisor"
      },
      {
        item_name: "To Kill a Mockingbird",
        expected_quantity: 12,
        counted_quantity: 12,
        variance: 0,
        notes: "Correct"
      },
      {
        item_name: "1984",
        expected_quantity: 18,
        counted_quantity: 18,
        variance: 0,
        notes: "Verified"
      },
      {
        item_name: "Pride and Prejudice",
        expected_quantity: 6,
        counted_quantity: 6,
        variance: 0,
        notes: "Correct"
      }
    ],
    date: new Date("2026-01-20")
  },
  {
    stock_take_name: "Monthly Stock Take - January Week 2",
    location: "Storage Room A",
    status: "Completed",
    notes: "Regular monthly audit - Storage Room A section",
    items: [
      {
        item_name: "The Catcher in the Rye",
        expected_quantity: 18,
        counted_quantity: 17,
        variance: -1,
        notes: "Discrepancy found - 1 unit missing"
      },
      {
        item_name: "Brave New World",
        expected_quantity: 8,
        counted_quantity: 8,
        variance: 0,
        notes: "Count verified"
      }
    ],
    date: new Date("2026-01-22")
  },
  {
    stock_take_name: "Monthly Stock Take - January Week 3",
    location: "Display Area",
    status: "Completed",
    notes: "Display area inventory verification",
    items: [
      {
        item_name: "Harry Potter and the Sorcerer's Stone",
        expected_quantity: 18,
        counted_quantity: 18,
        variance: 0,
        notes: "Display stock verified"
      },
      {
        item_name: "The Hobbit",
        expected_quantity: 8,
        counted_quantity: 8,
        variance: 0,
        notes: "Count correct"
      },
      {
        item_name: "The Lord of the Rings",
        expected_quantity: 5,
        counted_quantity: 5,
        variance: 0,
        notes: "Verified"
      }
    ],
    date: new Date("2026-01-24")
  },
  {
    stock_take_name: "Cycle Count - Shelf A1",
    status: "In Progress",
    location: "Shelf A1",
    notes: "Weekly spot check on frequently accessed shelf",
    items: [
      {
        item_name: "The Great Gatsby",
        expected_quantity: 5,
        counted_quantity: 5,
        variance: 0,
        notes: "Being counted"
      },
      {
        item_name: "The Catcher in the Rye",
        expected_quantity: 4,
        counted_quantity: 4,
        variance: 0,
        notes: "Verified"
      }
    ],
    date: new Date("2026-01-28")
  }
];

// =====================================================================
// SYSTEM SUMMARY - What This Test Data Demonstrates
// =====================================================================
const systemSummary = {
  users: {
    total: 4,
    roles: ["Supervisor", "Operator"],
    features: [
      "User authentication and login",
      "Role-based access control",
      "User management by supervisor"
    ]
  },
  locations: {
    total: 8,
    types: [
      "Main storage areas",
      "Secondary storage",
      "Receiving/Shipping docks",
      "Display areas"
    ],
    features: [
      "Location-based tracking",
      "Stock takes by location",
      "Transfer between locations"
    ]
  },
  items: {
    total: 12,
    type: "Books",
    skuRange: "BOOK-001 to BOOK-012",
    features: [
      "Item catalog management",
      "SKU tracking",
      "Price per unit tracking",
      "Transaction history per item"
    ]
  },
  transactions: {
    inbound: 6,
    outbound: 8,
    totalQuantity: 147,
    features: [
      "Inbound transactions (receiving)",
      "Outbound transactions (shipping/sales)",
      "Location-based transfers",
      "Transaction history with notes",
      "Price tracking per transaction"
    ]
  },
  stockTakes: {
    completed: 3,
    inProgress: 1,
    total: 4,
    features: [
      "Physical inventory counts",
      "Expected vs actual quantities",
      "Variance tracking (shrinkage/overages)",
      "Stock accuracy metrics",
      "Location-specific audits"
    ]
  },
  reports: {
    available: [
      "Transaction reports (filtered by date range)",
      "Stock accuracy percentage",
      "Inventory turnover metrics",
      "Shrinkage analysis",
      "Location-wise inventory status",
      "Real-time dashboard with KPIs"
    ]
  }
};

module.exports = {
  testUsers,
  testLocations,
  testItems,
  testTransactions,
  testStockTakes,
  systemSummary
};
