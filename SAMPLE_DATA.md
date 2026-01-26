# Book Inventory System - Sample Data

## Users

### Supervisor Account
```json
{
  "email": "supervisor@inventory.com",
  "password": "SupervisorPassword123!",
  "role": "supervisor"
}
```

### Operator Accounts
```json
[
  {
    "email": "operator1@inventory.com",
    "password": "OperatorPass123!",
    "role": "operator"
  },
  {
    "email": "operator2@inventory.com",
    "password": "OperatorPass123!",
    "role": "operator"
  },
  {
    "email": "john.doe@inventory.com",
    "password": "JohnDoe123!",
    "role": "operator"
  }
]
```

---

## Locations

```json
[
  {
    "location_name": "Main Warehouse"
  },
  {
    "location_name": "Storage Room A"
  },
  {
    "location_name": "Storage Room B"
  },
  {
    "location_name": "Receiving Dock"
  },
  {
    "location_name": "Shipping Dock"
  },
  {
    "location_name": "Shelf A1"
  },
  {
    "location_name": "Shelf B2"
  },
  {
    "location_name": "Display Area"
  }
]
```

---

## Items (Books)

```json
[
  {
    "item_name": "The Great Gatsby",
    "sku": "BOOK-001"
  },
  {
    "item_name": "To Kill a Mockingbird",
    "sku": "BOOK-002"
  },
  {
    "item_name": "1984",
    "sku": "BOOK-003"
  },
  {
    "item_name": "Pride and Prejudice",
    "sku": "BOOK-004"
  },
  {
    "item_name": "The Catcher in the Rye",
    "sku": "BOOK-005"
  },
  {
    "item_name": "Brave New World",
    "sku": "BOOK-006"
  },
  {
    "item_name": "Jane Eyre",
    "sku": "BOOK-007"
  },
  {
    "item_name": "Wuthering Heights",
    "sku": "BOOK-008"
  },
  {
    "item_name": "The Lord of the Rings",
    "sku": "BOOK-009"
  },
  {
    "item_name": "Harry Potter and the Sorcerer's Stone",
    "sku": "BOOK-010"
  },
  {
    "item_name": "The Hobbit",
    "sku": "BOOK-011"
  },
  {
    "item_name": "Moby Dick",
    "sku": "BOOK-012"
  }
]
```

---

## Transactions

### Inbound Transactions (Receiving Books)
```json
[
  {
    "type": "inbound",
    "item_name": "The Great Gatsby",
    "qty": 20,
    "to_location": "Main Warehouse",
    "date": "2026-01-20",
    "notes": "New shipment received from supplier"
  },
  {
    "type": "inbound",
    "item_name": "To Kill a Mockingbird",
    "qty": 15,
    "to_location": "Main Warehouse",
    "date": "2026-01-21",
    "notes": "Restock order"
  },
  {
    "type": "inbound",
    "item_name": "1984",
    "qty": 25,
    "to_location": "Receiving Dock",
    "date": "2026-01-22",
    "notes": "Bulk purchase from distributor"
  },
  {
    "type": "inbound",
    "item_name": "Pride and Prejudice",
    "qty": 10,
    "to_location": "Main Warehouse",
    "date": "2026-01-23",
    "notes": "New edition release"
  }
]
```

### Outbound Transactions (Selling/Shipping Books)
```json
[
  {
    "type": "outbound",
    "item_name": "The Great Gatsby",
    "qty": 5,
    "from_location": "Main Warehouse",
    "date": "2026-01-24",
    "notes": "Order #ORD001 shipped"
  },
  {
    "type": "outbound",
    "item_name": "To Kill a Mockingbird",
    "qty": 3,
    "from_location": "Main Warehouse",
    "date": "2026-01-25",
    "notes": "Customer order"
  },
  {
    "type": "outbound",
    "item_name": "The Catcher in the Rye",
    "qty": 8,
    "from_location": "Shelf A1",
    "date": "2026-01-26",
    "notes": "Bulk sale to bookstore"
  },
  {
    "type": "outbound",
    "item_name": "Harry Potter and the Sorcerer's Stone",
    "qty": 12,
    "from_location": "Display Area",
    "date": "2026-01-27",
    "notes": "Holiday promotion order"
  }
]
```

### Movement Transactions (Moving Between Locations)
```json
[
  {
    "type": "movement",
    "item_name": "The Great Gatsby",
    "qty": 5,
    "from_location": "Main Warehouse",
    "to_location": "Display Area",
    "date": "2026-01-20",
    "notes": "Moved to display for promotion"
  },
  {
    "type": "movement",
    "item_name": "Brave New World",
    "qty": 10,
    "from_location": "Receiving Dock",
    "to_location": "Storage Room A",
    "date": "2026-01-21",
    "notes": "Stockroom organization"
  },
  {
    "type": "movement",
    "item_name": "1984",
    "qty": 8,
    "from_location": "Storage Room B",
    "to_location": "Shelf B2",
    "date": "2026-01-22",
    "notes": "Shelf restocking"
  },
  {
    "type": "movement",
    "item_name": "The Lord of the Rings",
    "qty": 6,
    "from_location": "Main Warehouse",
    "to_location": "Shelf A1",
    "date": "2026-01-23",
    "notes": "Organized shelving"
  }
]
```

---

## Stock Takes (Physical Inventory Counts)

```json
[
  {
    "item_name": "The Great Gatsby",
    "qty": 18,
    "location": "Main Warehouse",
    "notes": "Physical count completed",
    "createdAt": "2026-01-27"
  },
  {
    "item_name": "To Kill a Mockingbird",
    "qty": 12,
    "location": "Main Warehouse",
    "notes": "Quarterly inventory check",
    "createdAt": "2026-01-27"
  },
  {
    "item_name": "1984",
    "qty": 22,
    "location": "Storage Room A",
    "notes": "Physical count completed",
    "createdAt": "2026-01-27"
  },
  {
    "item_name": "Pride and Prejudice",
    "qty": 10,
    "location": "Main Warehouse",
    "notes": "Verified count",
    "createdAt": "2026-01-27"
  },
  {
    "item_name": "The Catcher in the Rye",
    "qty": 15,
    "location": "Shelf A1",
    "notes": "Physical count completed",
    "createdAt": "2026-01-26"
  },
  {
    "item_name": "Brave New World",
    "qty": 9,
    "location": "Storage Room B",
    "notes": "Quarterly inventory check",
    "createdAt": "2026-01-26"
  },
  {
    "item_name": "The Lord of the Rings",
    "qty": 14,
    "location": "Display Area",
    "notes": "Physical count completed",
    "createdAt": "2026-01-25"
  },
  {
    "item_name": "Harry Potter and the Sorcerer's Stone",
    "qty": 20,
    "location": "Main Warehouse",
    "notes": "Physical count completed",
    "createdAt": "2026-01-25"
  }
]
```

---

## Summary

**Total Users:** 4 (1 supervisor + 3 operators)  
**Total Locations:** 8  
**Total Books:** 12  
**Total Transactions:** 11 (4 inbound + 4 outbound + 4 movement)  
**Total Stock Takes:** 8  

### How to Use This Data

1. **Create Users First:** Use the supervisor account to login and create operator accounts
2. **Add Locations:** Create the 8 locations in the system
3. **Add Items (Books):** Create the 12 book entries
4. **Create Transactions:** Add inbound, outbound, and movement transactions to track inventory flow
5. **Create Stock Takes:** Record physical inventory counts for verification

This sample data provides a realistic scenario for testing:
- User management and role-based access
- Transaction tracking (inbound, outbound, movement)
- Stock taking and physical inventory counts
- Reports and analytics with diverse transaction types
- Multi-location inventory management
