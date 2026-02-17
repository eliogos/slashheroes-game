import { Hono } from 'hono';
import { middleware } from './_main/middleware.js';
import { handleApiInteractions } from './_main/interactions.js';
import { handleApiEvents } from './_main/events.js';

const app = new Hono();

// #region api/interactions
app.use('/api/interactions', middleware);
app.post('/api/interactions', handleApiInteractions);
// #endregion

// #region events
app.use('/events', middleware);
app.post('/events', handleApiEvents);
// #endregion

export default {
	fetch: app.fetch,
};
