// @flow

'use strict';

import type { Action } from './types';

type Tab = 'history' | 'order';


export function selectTab(tab: Tab): Action {
  return {
    type: "SWITCH_TAB",
    tab,
  };
}
