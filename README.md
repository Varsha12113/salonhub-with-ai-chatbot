# GlowUp Salon — AI Chat Assistant

An AI-powered chat widget integrated into the GlowUp Salon booking platform. It lets customers ask about services, check real-time slot availability, view their booking history, and get personalised recommendations — all from a floating chat widget available on every customer-facing page.

Powered by **Groq's Llama 3.3 70B** model via a secure Django proxy endpoint, so the API key is never exposed to the browser.

---

## Features

- Floating chat widget with purple theme matching the site design
- Pulse ring + bouncing tooltip to draw attention to the assistant
- Auto-opens when a user visits the `/services` page
- Persists open/closed state and full conversation history across page navigation (localStorage)
- Hidden on all `/admin` routes — chat is customer-facing only
- Typing indicator while waiting for a response
- Quick-reply buttons: *Check my bookings*, *Recommend a service*, *Slots for tomorrow*, *Pricing*
- Personalised responses for logged-in users (greets by name, reads real booking data)
- Date-aware slot lookup — understands "today", "tomorrow", and weekday names
- Service recommendations based on the user's past bookings

---

## Architecture

```
React ChatWidget
      │  (Axios → httpPost, JWT auto-attached)
      ▼
Django  /api/chat/
      │  1. Decode JWT → identify user (or anonymous)
      │  2. Pull live data from DB:
      │       - Services & prices (Child_services)
      │       - Today's / requested date's slots (DailySlot)
      │       - User's upcoming & past bookings (Booking)
      │  3. Build a system prompt with all of the above
      ▼
Groq API (Llama 3.3 70B)
      │  Generates a context-aware reply
      ▼
JSON { "reply": "..." } → rendered in the chat widget
```

The frontend never talks to Groq directly — every request goes through the Django proxy so the `GROQ_API_KEY` stays server-side only.

---

## Tech Stack

| Layer | Technology |
|---|---|
| LLM | Groq — Llama 3.3 70B (free tier) |
| Backend | Django view + `groq` Python SDK |
| Auth | Existing Simple JWT — decoded server-side to identify the user |
| Frontend | React component (`ChatWidget.jsx`), Axios via existing `httpPost` helper |
| Persistence | Browser `localStorage` for chat history and open/closed state |

---

## What's Implemented

### Setup
- [x] Groq API integration (`llama-3.3-70b-versatile`)
- [x] Django proxy endpoint `/api/chat/`
- [x] Real service catalog + prices pulled from `Child_services`
- [x] Real-time slot availability pulled from `DailySlot`
- [x] Multi-turn conversation history sent with every request

### Phase 1 — Logged-in User Context + Date-Specific Slots
- [x] JWT decoded server-side to identify the logged-in user
- [x] Bot greets the user by name
- [x] Bot reads and displays the user's upcoming bookings
- [x] Date parsing for "today", "tomorrow", and weekday names (e.g. "Saturday")
- [x] Slot availability lookup for any parsed date
- [x] Falls back to the next available day if the requested date is fully booked

### Phase 2 — Booking Status + Service Recommendations
- [x] Booking status checker — answers "what's my booking status?" using real data
- [x] Service recommendations generated from the user's past completed bookings
- [x] Bot can quote exact prices and durations for any service

### UI / UX
- [x] Purple-themed widget matching the GlowUp Salon brand
- [x] Auto-opens on the `/services` route
- [x] Hidden on all `/admin/*` routes
- [x] Conversation and open state persisted in `localStorage`
- [x] Typing indicator, slide-in animation, pulse ring, bouncing tooltip

### Not Implemented (by choice)
- [ ] Phase 3 — Direct booking via chat (`/api/chat/book/`). Scoped out for now; the bot guides users to the booking page instead of creating bookings itself.

---

## Project Structure (new/changed files)

```
salonhub_v2/
├── chatbot/                          # NEW Django app
│   ├── __init__.py
│   ├── views.py                      # chat() view — JWT decode, DB context, Groq call
│   └── urls.py                       # routes /api/chat/ → chat()
├── salonhub_B/
│   ├── settings.py                   # + GROQ_API_KEY, + 'chatbot' in INSTALLED_APPS
│   └── urls.py                       # + path('api/chat/', include('chatbot.urls'))
├── .env                               # + GROQ_API_KEY=gsk_...
└── requirements.txt                   # + groq

frontend/
└── src/
    ├── App.js                         # + <ChatWidget /> mounted inside BrowserRouter
    ├── components/
    │   ├── ChatWidget.jsx             # NEW — full chat UI
    │   └── services/
    │       └── chatService.jsx        # NEW — sendChatMessage() wrapper
    └── config/
        └── httphandler.js             # removed /api/chat/ from publicRoutes
```

---

## Setup Instructions

### 1. Get a free Groq API key
Sign up at [console.groq.com](https://console.groq.com) and create an API key (no credit card required).

### 2. Backend

```bash
pip install groq
```

Add to `.env`:
```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
```

Add to `settings.py`:
```python
GROQ_API_KEY = env("GROQ_API_KEY")

INSTALLED_APPS = [
    ...
    'chatbot',
]
```

Add to the project's `urls.py`:
```python
path('api/chat/', include('chatbot.urls')),
```

### 3. Frontend

In `src/config/httphandler.js`, make sure `/api/chat/` is **not** in `publicRoutes` so the JWT token is automatically attached to chat requests for logged-in users.

Mount the widget once in `App.js`, inside `<BrowserRouter>`:
```jsx
import ChatWidget from "./components/ChatWidget";
...
<ChatWidget />
```

### 4. Run

```bash
python manage.py runserver
npm start
```

The chat bubble appears on every customer page except `/admin/*` routes.

---

## How the System Prompt Is Built

On every request, `chatbot/views.py` assembles a fresh system prompt containing:

1. **User context** — name, upcoming bookings, last two completed bookings (if logged in)
2. **Service catalog** — every active service grouped by gender and category, with price and duration
3. **Slot availability** — available slots for today, or for a date detected in the user's message
4. **Booking policy** — login requirement, payment flow, cancellation window, GST

This means the bot's knowledge is always live — no retraining needed when prices, services, or slots change.

---

## Known Limitations

- The bot cannot create a booking on the user's behalf (Phase 3 was scoped out)
- Slot suggestions depend on `DailySlot` records existing for the requested date — make sure the Celery `generate_rolling_slots` task has run, or slots will appear unavailable
- Groq's free tier has rate limits (30 req/min, ~14,400/day) — sufficient for development and demo traffic
