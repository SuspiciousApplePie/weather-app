import {
  removeLoading,
  createSearchBar,
  renderSearchBar,
  renderButton,
  renderHeader,
  renderWrapper,
  createButton,
  createWrapper,
  createWeatherCardHeader,
} from "./ui";

import {
  setUpClickListener,
  setUpInputListener,
  setUpSumbitListener,
} from "./controller";

export function init() {
  removeLoading();
  const searchElement = createSearchBar();
  renderSearchBar(searchElement);
  const buttons = createButton();
  renderButton(buttons);
  const head = createWeatherCardHeader();
  renderHeader(head);
  const wrapper = createWrapper();
  renderWrapper(wrapper);
  setUpClickListener();
  setUpInputListener();
  setUpSumbitListener();
}
