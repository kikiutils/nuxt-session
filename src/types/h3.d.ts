import { H3Event } from 'h3';
import type { EventHandlerRequest } from 'h3';

declare global {
	type H3RequestEvent = H3Event<EventHandlerRequest>;
}
