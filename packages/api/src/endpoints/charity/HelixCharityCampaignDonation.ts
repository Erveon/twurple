import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { type BaseApiClient } from '../../client/BaseApiClient';
import { type HelixCharityCampaignDonationData } from '../../interfaces/endpoints/charity.external';
import type { HelixUser } from '../user/HelixUser';
import { HelixCharityCampaignAmount } from './HelixCharityCampaignAmount';

/**
 * A donation to a charity campaign in a Twitch channel.
 */
@rtfm('api', 'HelixCharityCampaignDonation')
export class HelixCharityCampaignDonation extends DataObject<HelixCharityCampaignDonationData> {
	/** @internal */ @Enumerable(false) private readonly _client: BaseApiClient;

	/** @internal */
	constructor(data: HelixCharityCampaignDonationData, client: BaseApiClient) {
		super(data);
		this._client = client;
	}

	/**
	 * An ID that identifies the charity campaign.
	 */
	get campaignId(): string {
		return this[rawDataSymbol].campaign_id;
	}

	/**
	 * The ID of the donating user.
	 */
	get donorId(): string {
		return this[rawDataSymbol].user_id;
	}

	/**
	 * The name of the donating user.
	 */
	get donorName(): string {
		return this[rawDataSymbol].user_login;
	}

	/**
	 * The display name of the donating user.
	 */
	get donorDisplayName(): string {
		return this[rawDataSymbol].user_name;
	}

	/**
	 * Gets more information about the donating user.
	 */
	async getDonor(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
	}

	/**
	 * An object that contains the amount of money that the user donated.
	 */
	get amount(): HelixCharityCampaignAmount {
		return new HelixCharityCampaignAmount(this[rawDataSymbol].amount);
	}
}
