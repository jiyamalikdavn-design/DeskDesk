# DeskDesk

DeskDesk is a responsive, multi-tenant helpdesk demo for support agents and customer managers. It prioritizes the work that is closest to an SLA deadline, makes at-risk tickets easy to spot, and gives managers a quick view of tenant SLA health.

> **Project status:** This repository is being developed as a front-end learning project. The experience uses sample data and simplified SLA rules; it is not a production helpdesk.

## What it does

- Separates tickets, agents, and SLA rules by tenant.
- Shows a live ticket queue sorted by SLA urgency.
- Creates and edits tickets with input validation.
- Calculates response and resolution deadlines from a ticket's priority.
- Labels tickets as on track, at risk, or breached, with readable countdowns and warnings.
- Provides an SLA dashboard with tenant-level status counts.
- Lets managers search, filter, reassign, and escalate tickets.
- Persists sample data and interface preferences in browser storage.
- Refreshes the displayed sample data on a timer to simulate live updates.
- Supports phone- and laptop-width layouts.

## Primary users

| User | Goal |
| --- | --- |
| Support agent | See the most urgent ticket, update it quickly, and avoid SLA breaches. |
| Customer manager | Monitor SLA health, find at-risk tickets, and rebalance work before deadlines are missed. |

## Core workflow

1. Choose a tenant and sample role.
2. Open the SLA-sorted ticket queue.
3. Select the most urgent ticket and update its status or details.
4. Watch the queue and SLA status refresh after the update.
5. Use the dashboard to filter, reassign, or escalate tickets that need attention.

## Planned screens

- Tenant sign-in
- Ticket queue
- Ticket detail
- New/edit ticket form
- SLA dashboard
- Agent workload view
- Tenant settings and help

## Technology

The core implementation is intended to use:

- HTML5, CSS3, and vanilla JavaScript
- Bootstrap 5 for responsive layout and components
- `localStorage` (or local JSON data) for persistence
- Git and GitHub for source control

Optional stretch work may use React + Vite and Chart.js or Leaflet.

## Getting started

When the front-end files are present, serve the project from its root with any static web server, then open the local URL in a browser. For a simple HTML/CSS/JavaScript version, opening `index.html` directly may also work, though a local server is recommended for a consistent development environment.

For deployment, GitHub Pages or Vercel are suitable static-hosting options.

## Data model

| Entity | Key fields |
| --- | --- |
| Tenant | `tenantId`, `name`, `slaRules` |
| SLA rule | `priority`, `responseMins`, `resolutionMins` |
| Ticket | `ticketId`, `tenantId`, `subject`, `description`, `customer`, `priority`, `status`, `assigneeId`, `createdAt`, `responseDueAt`, `resolutionDueAt` |
| Agent | `agentId`, `tenantId`, `name`, `role`, `openTickets` |
| Preferences | `tenantId`, `role`, `lastScreen`, `sortOrder` |

Suggested browser-storage keys:

```text
deskdesk_tenants
deskdesk_tickets
deskdesk_agents
deskdesk_prefs
```

## Important limitations

- Updates are simulated through timed polling of local sample data, not WebSockets or server push.
- There is no production backend, authentication system, customer-data ingestion, billing, or third-party helpdesk integration.
- SLA timers follow documented, simplified rules and should be tested against hand-calculated examples.
- Tenant isolation must be enforced for every data read and write.

## Accessibility and responsive design

DeskDesk aims to use semantic forms, visible labels, keyboard-friendly controls, and status text in addition to color. On smaller screens, forms remain single-column and wide tables can scroll horizontally. SLA warnings and countdowns should remain understandable at every screen size.

## Future enhancements

- CSV export of visible ticket rows
- Richer search and filters
- Agent/manager view switch
- SLA-performance and ticket-volume charts
- A React + Vite implementation

## License

No license has been selected yet.
