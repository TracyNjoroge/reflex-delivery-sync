# Reflex – Delivery Sync System

## Overview

Reflex is a prototype delivery coordination system designed for small retailers.

Small retailers often coordinate deliveries through WhatsApp and phone calls, making it difficult to track delivery requests, rider assignments, and delivery status.

Reflex provides a central system where:

* Retailer staff create delivery requests.
* Dispatchers view and assign deliveries to riders.
* Riders view their assigned deliveries and update delivery statuses.
* Changes are synchronised across the different views in real time using Firebase Realtime Database.

---

## Problem Statement

Small retailers may coordinate deliveries through WhatsApp messages and phone calls. This can lead to:

* No central record of delivery requests.
* Difficulty tracking delivery progress.
* Unclear rider assignments.
* Limited visibility of delivery status.
* Delays in communicating updates between retailers, dispatchers, and riders.

---

## Solution

Reflex provides a simple, centralised delivery coordination workflow connecting retailers, dispatchers, and riders through a shared Firebase database.

```text
Retailer
   │
   │ Creates Delivery Request
   ↓
OPEN
   │
   │ Dispatcher assigns Rider
   ↓
ASSIGNED
   │
   │ Rider collects order
   ↓
PICKED_UP
   │
   │ Rider completes delivery
   ↓
DELIVERED
```

All three views communicate with the same delivery records in Firebase, allowing changes made by one user to be reflected in the other views without manually refreshing the page.

---

## System Architecture

```text
                    Firebase Realtime Database
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ↓                ↓                ↓
         Retailer         Dispatcher          Rider
             │                │                │
       Create Request     Assign Rider     Update Status
             │                │                │
             └────────────────┴────────────────┘
                       Real-Time Sync
```

### Retailer View

The retailer creates a new delivery request by entering customer and delivery information.

A new delivery is initially stored with the status:

```text
OPEN
```

The request is then available to the dispatcher.

### Dispatcher View

The dispatcher listens for new `OPEN` deliveries.

The dispatcher can assign an available rider to a delivery. Once assigned, the delivery status changes to:

```text
ASSIGNED
```

and the rider information is stored with the delivery.

### Rider View

The rider sees deliveries assigned specifically to them.

The rider can update the delivery status from:

```text
ASSIGNED
      ↓
PICKED_UP
      ↓
DELIVERED
```

These changes are written back to Firebase and can be reflected across the other views in real time.

---

## Delivery Data Model

All three views use the same delivery object and field structure.

```json
{
  "id": "DEL-001",
  "customerName": "Amina Mohamed",
  "phone": "0712345678",
  "address": "Moi Avenue, Shop #4",
  "itemDescription": "Grocery order",
  "status": "OPEN",
  "assignedRider": null
}
```

### Fields

| Field             | Type          | Description                             |
| ----------------- | ------------- | --------------------------------------- |
| `id`              | String        | Unique delivery identifier              |
| `customerName`    | String        | Customer's full name                    |
| `phone`           | String        | Customer's contact number               |
| `address`         | String        | Delivery destination                    |
| `itemDescription` | String        | Description of the item being delivered |
| `status`          | String        | Current delivery status                 |
| `assignedRider`   | String / null | Rider assigned to the delivery          |

### Delivery Statuses

| Status      | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `OPEN`      | Delivery request has been created and is waiting for dispatch |
| `ASSIGNED`  | Dispatcher has assigned the delivery to a rider               |
| `PICKED_UP` | Rider has collected the delivery                              |
| `DELIVERED` | Rider has completed the delivery                              |

---

## Real-Time Synchronisation

Firebase Realtime Database acts as the shared source of delivery information.

```text
Retailer creates delivery
        ↓
Firebase
        ↓
Dispatcher receives request
        ↓
Dispatcher assigns rider
        ↓
Firebase
        ↓
Rider receives assignment
        ↓
Rider updates status
        ↓
Firebase
        ↓
Retailer + Dispatcher see updated status
```

The application uses Firebase listeners to detect changes to the delivery records and update the interface without requiring a manual page refresh.

---

## Project Structure

```text
reflex-delivery-sync/
│
├── firebase.js
├── index.html
├── README.md
│
├── retailer/
│   └── index.html
│
├── dispatcher/
│   └── index.html
│
└── rider/
    └── index.html
```

### Main Files

**`firebase.js`**

Contains the Firebase configuration and shared Firebase Realtime Database functions used by the application.

**`retailer/index.html`**

Provides the retailer interface for creating delivery requests.

**`dispatcher/index.html`**

Provides the dispatcher interface for viewing incoming requests and assigning riders.

**`rider/index.html`**

Provides the rider interface for viewing assigned deliveries and updating delivery statuses.

---

## Technology Stack

* **HTML5** – Application structure
* **Tailwind CSS** – Styling and responsive UI
* **JavaScript (ES Modules)** – Application logic and Firebase integration
* **Firebase Realtime Database** – Shared delivery data and real-time synchronisation
* **Firebase Hosting** – Application deployment

---

## Running the Project Locally

Because the project uses JavaScript modules and Firebase, it should be served through a local web server rather than opened directly using `file://`.

From the project directory, you can use a simple local server.

For example, with Python:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

The individual views can be accessed through their respective directories:

```text
http://localhost:8000/retailer/
http://localhost:8000/dispatcher/
http://localhost:8000/rider/
```

---

## Firebase Configuration

The application uses Firebase Realtime Database as the shared data layer.

The Firebase project is configured through:

```text
firebase.js
```

The three views import the shared Firebase configuration instead of creating separate database connections.

This ensures that the Retailer, Dispatcher, and Rider views communicate with the same Firebase Realtime Database.

---

## Core Workflow

### 1. Retailer Creates a Delivery

The retailer enters:

* Customer name
* Phone number
* Delivery address
* Item description

The delivery is saved to Firebase with an `OPEN` status.

### 2. Dispatcher Receives the Request

The dispatcher listens for `OPEN` deliveries.

The new request appears in the dispatcher dashboard without requiring a manual refresh.

### 3. Dispatcher Assigns a Rider

The dispatcher assigns the delivery to a rider.

The delivery changes to:

```text
ASSIGNED
```

### 4. Rider Receives the Assignment

The assigned delivery appears on the rider dashboard.

The rider can then mark it as:

```text
PICKED_UP
```

### 5. Rider Completes the Delivery

After completing the delivery, the rider changes the status to:

```text
DELIVERED
```

The updated status is stored in Firebase and becomes available to the other views.

---

## Prototype Goals

The prototype demonstrates:

* Centralised delivery records.
* Communication between retailer, dispatcher, and rider views.
* Rider assignment.
* Delivery status tracking.
* Real-time Firebase synchronisation.
* A shared delivery data model.
* A simple end-to-end delivery workflow.

---

## Future Improvements

With additional development time, Reflex could be extended with:

* User authentication and role-based access.
* Multiple riders and dispatcher accounts.
* Rider location tracking.
* Automated rider assignment.
* Delivery history and reporting.
* Improved offline support and conflict resolution.
* Order confirmation or scanning.
* Notifications for delivery status changes.
* A repository/service layer to abstract Firebase database operations.

---

## Project Status

**Prototype / MVP**

Reflex is currently a prototype that demonstrates the core delivery coordination and real-time synchronisation workflow across the Retailer, Dispatcher, and Rider views.
