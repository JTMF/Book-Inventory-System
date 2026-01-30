// Mock data for testing - Local office document management system
// Set USE_MOCK_DATA = true in Dashboard.js to use this data

export const mockTransactions = [
  {
    _id: "mock_trans_1",
    item_name: "Q1 Sales Report",
    type: "inbound",
    quantity: 20,
    pricePerUnit: 0,
    to_location: "Sales Department",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    createdBy: "operator1@company.com",
    notes: "Q1 quarterly sales analysis and metrics"
  },
  {
    _id: "mock_trans_2",
    item_name: "Project Proposal - Marketing Initiative",
    type: "inbound",
    quantity: 15,
    pricePerUnit: 0,
    to_location: "Marketing Department",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdBy: "operator2@company.com",
    notes: "New marketing campaign proposal documents"
  },
  {
    _id: "mock_trans_3",
    item_name: "HR Onboarding Packages",
    type: "inbound",
    quantity: 25,
    pricePerUnit: 0,
    to_location: "HR Department",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    createdBy: "operator1@company.com",
    notes: "Employee onboarding and welcome packets"
  },
  {
    _id: "mock_trans_4",
    item_name: "Client Contract Templates",
    type: "inbound",
    quantity: 10,
    pricePerUnit: 0,
    to_location: "Legal Department",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdBy: "operator2@company.com",
    notes: "Updated legal contract templates"
  },
  {
    _id: "mock_trans_5",
    item_name: "IT System Documentation",
    type: "inbound",
    quantity: 18,
    pricePerUnit: 0,
    to_location: "IT Department",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    createdBy: "operator1@company.com",
    notes: "System architecture and implementation guides"
  },
  {
    _id: "mock_trans_6",
    item_name: "Budget Planning Spreadsheets",
    type: "inbound",
    quantity: 30,
    pricePerUnit: 0,
    to_location: "Finance Department",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdBy: "operator2@company.com",
    notes: "Annual budget planning and forecasting documents"
  },
  {
    _id: "mock_trans_7",
    item_name: "Q1 Sales Report",
    type: "outbound",
    quantity: 5,
    pricePerUnit: 0,
    from_location: "Sales Department",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    createdBy: "operator1@company.com",
    notes: "Sales report distributed to executives"
  },
  {
    _id: "mock_trans_8",
    item_name: "Project Proposal - Marketing Initiative",
    type: "outbound",
    quantity: 3,
    pricePerUnit: 0,
    from_location: "Marketing Department",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdBy: "operator2@company.com",
    notes: "Proposal shared with stakeholders"
  },
  {
    _id: "mock_trans_9",
    item_name: "Assist Request - Equipment",
    type: "outbound",
    quantity: 8,
    pricePerUnit: 0,
    from_location: "Support Center",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdBy: "operator1@company.com",
    notes: "Equipment assistance requests processed"
  },
  {
    _id: "mock_trans_10",
    item_name: "HR Onboarding Packages",
    type: "outbound",
    quantity: 12,
    pricePerUnit: 0,
    from_location: "HR Department",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdBy: "operator2@company.com",
    notes: "Onboarding packages distributed to new employees"
  },
  {
    _id: "mock_trans_11",
    item_name: "Client Contract Templates",
    type: "outbound",
    quantity: 7,
    pricePerUnit: 0,
    from_location: "Legal Department",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdBy: "operator1@company.com",
    notes: "Contract templates sent to sales team"
  },
  {
    _id: "mock_trans_12",
    item_name: "Budget Planning Spreadsheets",
    type: "outbound",
    quantity: 4,
    pricePerUnit: 0,
    from_location: "Finance Department",
    date: new Date(Date.now() - 6 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    createdBy: "operator2@company.com",
    notes: "Budget documents shared with department heads"
  },
  {
    _id: "mock_trans_13",
    item_name: "Assist Request - Training Materials",
    type: "outbound",
    quantity: 3,
    pricePerUnit: 0,
    from_location: "Training Center",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    createdBy: "operator1@company.com",
    notes: "Training materials for new system rollout"
  },
  {
    _id: "mock_trans_14",
    item_name: "IT System Documentation",
    type: "outbound",
    quantity: 6,
    pricePerUnit: 0,
    from_location: "IT Department",
    date: new Date(Date.now() - 1 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    createdBy: "operator2@company.com",
    notes: "System documentation for deployment"
  }
]

export const mockStockTakes = [
  {
    _id: "mock_stock_1",
    stock_take_name: "Sales Department Document Audit",
    location: "Sales Department",
    status: "Completed",
    notes: "Monthly document inventory audit - Sales completed successfully",
    variance: 0,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdBy: "supervisor@company.com",
    items: [
      { item_name: "Q1 Sales Report", expected_quantity: 15, counted_quantity: 15, variance: 0 },
      { item_name: "Sales Presentation Decks", expected_quantity: 12, counted_quantity: 12, variance: 0 },
      { item_name: "Client Case Studies", expected_quantity: 18, counted_quantity: 18, variance: 0 },
      { item_name: "Sales Enablement Materials", expected_quantity: 6, counted_quantity: 6, variance: 0 }
    ]
  },
  {
    _id: "mock_stock_2",
    stock_take_name: "HR Department Document Audit",
    location: "HR Department",
    status: "Completed",
    notes: "Discrepancy found in onboarding documents",
    variance: -1,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdBy: "supervisor@company.com",
    items: [
      { item_name: "HR Onboarding Packages", expected_quantity: 18, counted_quantity: 17, variance: -1 },
      { item_name: "Employee Handbook", expected_quantity: 8, counted_quantity: 8, variance: 0 }
    ]
  },
  {
    _id: "mock_stock_3",
    stock_take_name: "Finance Department Document Audit",
    location: "Finance Department",
    status: "Completed",
    notes: "Budget and financial documents verification",
    variance: 0,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdBy: "operator1@company.com",
    items: [
      { item_name: "Budget Planning Spreadsheets", expected_quantity: 18, counted_quantity: 18, variance: 0 },
      { item_name: "Financial Reports", expected_quantity: 8, counted_quantity: 8, variance: 0 },
      { item_name: "Expense Tracking Forms", expected_quantity: 5, counted_quantity: 5, variance: 0 }
    ]
  },
  {
    _id: "mock_stock_4",
    stock_take_name: "Support Center Assist Request Log",
    location: "Support Center",
    status: "In Progress",
    notes: "Weekly audit of assist requests and support tickets",
    variance: 0,
    date: new Date(Date.now()),
    createdAt: new Date(Date.now()),
    createdBy: "operator2@company.com",
    items: [
      { item_name: "Assist Request - Equipment", expected_quantity: 5, counted_quantity: 5, variance: 0 },
      { item_name: "Assist Request - Training Materials", expected_quantity: 4, counted_quantity: 4, variance: 0 }
    ]
  }
]
