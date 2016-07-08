'use strict';

import type { Dispatch, GetState, Action, ThunkAction } from './types';

export function setCenter({lat, lng, latDelta, lngDelta}): Action {
  return {
    type: "SET_CENTER",
    lat,
    lng,
    latDelta,
    lngDelta
  };
}
