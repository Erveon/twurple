import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { type BaseApiClient } from '../../client/BaseApiClient';
import { type HelixGoalData, type HelixGoalType } from '../../interfaces/endpoints/goal.external';
import type { HelixUser } from '../user/HelixUser';

/**
 * A creator goal.
 */
@rtfm<HelixGoal>('api', 'HelixGoal', 'id')
export class HelixGoal extends DataObject<HelixGoalData> {
	/** @internal */ @Enumerable(false) private readonly _client: BaseApiClient;

	/** @internal */
	constructor(data: HelixGoalData, client: BaseApiClient) {
		super(data);
		this._client = client;
	}

	/**
	 * The ID of the goal.
	 */
	get id(): string {
		return this[rawDataSymbol].id;
	}

	/**
	 * The ID of the broadcaster the goal belongs to.
	 */
	get broadcasterId(): string {
		return this[rawDataSymbol].broadcaster_id;
	}

	/**
	 * The display name of the broadcaster the goal belongs to.
	 */
	get broadcasterDisplayName(): string {
		return this[rawDataSymbol].broadcaster_name;
	}

	/**
	 * The name of the broadcaster the goal belongs to.
	 */
	get broadcasterName(): string {
		return this[rawDataSymbol].broadcaster_login;
	}

	/**
	 * Gets more information about the broadcaster.
	 */
	async getBroadcaster(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
	}

	/**
	 * The type of the goal.
	 */
	get type(): HelixGoalType {
		return this[rawDataSymbol].type;
	}

	/**
	 * The description of the goal.
	 */
	get description(): string {
		return this[rawDataSymbol].description;
	}

	/**
	 * The current value of the goal.
	 */
	get currentAmount(): number {
		return this[rawDataSymbol].current_amount;
	}

	/**
	 * The target value of the goal.
	 */
	get targetAmount(): number {
		return this[rawDataSymbol].target_amount;
	}

	/**
	 * The date and time when the goal was created.
	 */
	get creationDate(): Date {
		return this[rawDataSymbol].created_at;
	}
}
