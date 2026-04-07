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
  hideHeader,
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
  const head = createWeatherCardHeader();
  renderHeader(head);
  hideHeader(head);
  const buttons = createButton();
  renderButton(buttons);
  const wrapper = createWrapper();
  renderWrapper(wrapper);
  setUpClickListener();
  setUpInputListener();
  setUpSumbitListener();
}
