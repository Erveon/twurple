import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { type BaseApiClient } from '../../client/BaseApiClient';
import { type HelixCharityCampaignData } from '../../interfaces/endpoints/charity.external';
import type { HelixUser } from '../user/HelixUser';
import { HelixCharityCampaignAmount } from './HelixCharityCampaignAmount';

/**
 * A charity campaign in a Twitch channel.
 */
@rtfm<HelixCharityCampaign>('api', 'HelixCharityCampaign', 'id')
export class HelixCharityCampaign extends DataObject<HelixCharityCampaignData> {
	/** @internal */ @Enumerable(false) private readonly _client: BaseApiClient;

	/** @internal */
	constructor(data: HelixCharityCampaignData, client: BaseApiClient) {
		super(data);
		this._client = client;
	}

	/**
	 * An ID that identifies the charity campaign.
	 */
	get id(): string {
		return this[rawDataSymbol].id;
	}

	/**
	 * The ID of the broadcaster.
	 */
	get broadcasterId(): string {
		return this[rawDataSymbol].broadcaster_id;
	}

	/**
	 * The name of the broadcaster.
	 */
	get broadcasterName(): string {
		return this[rawDataSymbol].broadcaster_login;
	}

	/**
	 * The display name of the broadcaster.
	 */
	get broadcasterDisplayName(): string {
		return this[rawDataSymbol].broadcaster_name;
	}

	/**
	 * Gets more information about the broadcaster.
	 */
	async getBroadcaster(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
	}

	/**
	 * The name of the charity.
	 */
	get charityName(): string {
		return this[rawDataSymbol].charity_name;
	}

	/**
	 * A description of the charity.
	 */
	get charityDescription(): string {
		return this[rawDataSymbol].charity_description;
	}

	/**
	 * A URL to an image of the charity's logo. The image’s type is PNG and its size is 100px X 100px.
	 */
	get charityLogo(): string {
		return this[rawDataSymbol].charity_logo;
	}

	/**
	 * A URL to the charity’s website.
	 */
	get charityWebsite(): string {
		return this[rawDataSymbol].charity_website;
	}

	/**
	 * An object that contains the current amount of donations that the campaign has received.
	 */
	get currentAmount(): HelixCharityCampaignAmount {
		return new HelixCharityCampaignAmount(this[rawDataSymbol].current_amount);
	}

	/**
	 * An object that contains the campaign’s target fundraising goal.
	 */
	get targetAmount(): HelixCharityCampaignAmount {
		return new HelixCharityCampaignAmount(this[rawDataSymbol].target_amount);
	}
}
