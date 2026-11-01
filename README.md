# DeskDesk

DeskDesk is a responsive, multi-tenant helpdesk demo for support agents and customer managers. It uses local sample data, timed polling, and a simplified SLA engine to help teams find urgent work before deadlines are missed.

> **Demo, not production:** DeskDesk does not use a server, real customer accounts, WebSockets, or push notifications. The sign-in flow uses sample accounts, updates are simulated by polling local data, and SLA calculations follow simplified rules.

## Highlights

- Interactive tenant, role, and sample-account sign-in; the interface adopts the selected company's color.
- Separate Agent and Manager dashboards, with role-specific screens and actions.
- A live ticket queue, sorted by SLA urgency by default, with simulated incoming tickets.
- Customer-name search and sorting by priority or status.
- Ticket detail view where agents add a required description/update and save changes.
- SLA countdowns and clear on-track, at-risk, and breached states.
- Read-only company and personal SLA dashboards for agents.
- Company and per-agent SLA dashboards for managers, with workload visibility and reassignment.
- Manager-only tenant settings for SLA rules and sample users.
- Weekly SLA-performance and tickets-per-day charts.
- Per-tenant local persistence, responsive layouts, and accessible feedback messages.

## Roles and permissions

| Capability | Agent | Manager |
| --- | --- | --- |
| Sign in, search, sort, and filter tickets | Yes | Yes |
| Open a ticket | Edit and update | View only |
| Company SLA dashboard | View only | View |
| Personal SLA dashboard | Own view | Not available |
| SLA dashboard per agent | No | Yes |
| Reassign tickets | No | Yes |
| Tenant settings | View only | Edit rules, agent rules, and sample users |
| About / Help | Yes | Yes |

## Core workflow

1. Pick a company, choose Agent or Manager, and select a sample account.
2. Enter the role-specific workspace, which shows only that tenant's data.
3. Use the ticket queue to find urgent work by SLA state, customer, priority, or status.
4. Agents open and update tickets; managers inspect workloads and reassign tickets.
5. Monitor SLA dashboards and charts as the local polling cycle refreshes the sample data.

## SLA rules

- **Priority:** High, Medium, or Low.
- **Ticket status:** In progress or Solved.
- **SLA state:** On track, At risk, or Breached.
- **At risk:** Fewer than 25% of the time window remains, or fewer than 10 minutes remain.
- **Breached:** An unresolved ticket has passed its deadline, or the ticket was solved after its deadline.
- Response and resolution deadlines are calculated from tenant rules when a ticket is created.
- Agents may have a deadline factor: Strict (75%), Standard (100%), or Relaxed (125%) of the tenant times.

## Dashboards and screens

| Screen | Intended users | Purpose |
| --- | --- | --- |
| Login portal | Everyone | Choose tenant, role, and sample account. |
| Ticket queue | Agents and managers | Review the SLA-sorted list; search, sort, and filter. |
| Ticket detail | Agents edit; managers view | Review a ticket; agents add updates and save. |
| Company SLA dashboard | Agents view; managers view | Monitor counts, daily tickets, and weekly SLA performance. |
| Personal SLA dashboard | Agents | Review the signed-in agent's performance. |
| SLA dashboard per agent | Managers | Inspect an agent's open work, charts, and counts. |
| Tenant settings | Agents view; managers edit | Review or change SLA rules and sample users. |
| About / Help | Everyone | Explain polling, roles, SLA states, and demo limits. |

## Data model

| Entity | Key fields |
| --- | --- |
| Tenant | `tenantId`, `name`, `colour`, `slaRules` |
| SLA rule | `priority`, `responseMins`, `resolutionMins` |
| Ticket | `ticketId`, `tenantId`, `subject`, `description`, `customer`, `priority`, `status`, `assigneeId`, `createdAt`, `resolvedAt`, `firstResponseAt`, `activity` |
| Agent | `agentId`, `tenantId`, `name`, `role`, `deadlineFactor` |
| Preferences | `tenantId`, `role`, `lastScreen`, `sortOrder` |

Suggested browser-storage keys:

```text
deskdesk_tenants
deskdesk_tickets
deskdesk_agents
deskdesk_prefs
```

Every read and write must be scoped by `tenantId`. The demo includes three tenants with agents, a manager, SLA rules, and approximately one week of tickets at different SLA stages.

## Technology

- HTML5, CSS3, JavaScript, and Bootstrap 5
- `localStorage` or local JSON for sample-data persistence
- Timers and `fetch` for simulated polling and refreshes
- Chart.js or inline SVG for charts
- Git and GitHub; GitHub Pages or Vercel for deployment

React + Vite is optional stretch work, not a requirement for the core demo.

## Run locally

Once the front-end files are in place, serve the repository root with a local static web server and open the resulting URL in a browser. Opening `index.html` directly may work for a simple implementation, but a local server provides a more consistent development environment.

## Accessibility and responsive behavior

- Use visible labels, semantic forms, keyboard-accessible controls, and visible focus states.
- Communicate SLA state with text and an icon as well as color.
- Announce live updates politely with `aria-live` without stealing focus.
- Respect reduced-motion preferences.
- Keep forms single-column on phones and allow wide tables to scroll horizontally.
- Use Bootstrap's responsive grid and check text contrast against WCAG AA (4.5:1 for body text).

## Project limitations

- Polling is simulated and local; it is not real-time push.
- There is no real authentication, server-side backend, customer-data ingestion, billing, or third-party integration.
- CSV export, creating a ticket from the queue, escalation, and pausing polling are good-to-have features.
- SLA timers and chart calculations must be tested against hand-calculated cases.

## License

No license has been selected yet.
