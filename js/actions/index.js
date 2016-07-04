// @flow

'use strict';

import * as errorsActions from './errorsActions';
import * as configActions from './configActions';


module.exports = {
  ...require('./configActions'),
  ...require('./errorsActions'),
};
