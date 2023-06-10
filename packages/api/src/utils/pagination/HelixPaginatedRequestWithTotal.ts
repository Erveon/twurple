import type { HelixPaginatedResponseWithTotal } from '@twurple/api-call';
import { rtfm } from '@twurple/common';
import { HelixPaginatedRequest } from './HelixPaginatedRequest';

/**
 * A special case of {@link HelixPaginatedRequest} with support for fetching the total number of entities, whenever an endpoint supports it.
 *
 * @inheritDoc
 */
@rtfm('api', 'HelixPaginatedRequestWithTotal')
export class HelixPaginatedRequestWithTotal<D, T> extends HelixPaginatedRequest<D, T> {
	/** @internal */ protected declare _currentData?: HelixPaginatedResponseWithTotal<D>;

	/**
	 * Gets the total number of entities existing in the queried result set.
	 */
	async getTotalCount(): Promise<number> {
		const data =
			this._currentData ??
			((await this._fetchData({ query: { after: undefined } })) as HelixPaginatedResponseWithTotal<D>);
		return data.total;
	}
}
