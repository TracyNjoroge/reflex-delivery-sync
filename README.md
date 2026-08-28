# Reflex – Delivery Sync System

## Overview

Reflex is a prototype delivery coordination system designed for small retailers.

Small retailers often coordinate deliveries through WhatsApp and phone calls, making it difficult to track delivery requests, rider assignments, and delivery status.

Reflex provides a central system where:

- Retailer staff create delivery requests.
- Dispatchers view and assign deliveries to riders.
- Riders update delivery statuses.
- Changes are synchronised in real time.

---

## Problem Statement

Small retailers may coordinate deliveries through WhatsApp messages and phone calls. This can lead to:

- No central record of delivery requests.
- Difficulty tracking delivery progress.
- Unclear rider assignments.
- Limited visibility of delivery status.
- Delays in communicating updates between retailers, dispatchers, and riders.

---

## Solution

Reflex provides a simple delivery coordination workflow.

```text
Retailer
   ↓
Creates Delivery Request
   ↓
Status: OPEN
   ↓
Dispatcher
   ↓
Assigns Rider
   ↓
Status: ASSIGNED
   ↓
Rider
   ↓
Updates Status
   ↓
PICKED_UP
   ↓
DELIVERED