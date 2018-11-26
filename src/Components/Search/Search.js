import React, {Component} from 'react';
import './Search.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTimesCircle, faSearch, faDownload, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faCoffee, faTimesCircle, faSearch, faDownload, faSearchPlus);

const Search = ({handleKeyPress}) =>
  <input type="text" onKeyDown={handleKeyPress} placeholder="Search for an image using a keyword..."/>


export default Search;
