import { ListingState } from '@/store/modules/listing/listingState';

export default {

  SET_IS_LIST_TYPE(state: ListingState, loadedState: boolean) {
    state.isListType = loadedState;
  }
};
