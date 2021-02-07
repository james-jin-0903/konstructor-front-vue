// getters

import { ListingState } from '@/store/modules/listing/listingState';

export default {
  getIsListType: (state: ListingState) => state.isListType,
};
