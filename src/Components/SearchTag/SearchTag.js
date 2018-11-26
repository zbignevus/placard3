import React, {Component} from 'react';
import './SearchTag.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faTimesCircle);

const SearchTag = ({tag, onDismiss, onClick}) =>
  <div className="searchTag"><span onClick={onClick}>{tag}</span>
    <button className="tagDismiss" onClick={onDismiss}>
      <FontAwesomeIcon icon="times-circle"/>
    </button>
  </div>


  export default SearchTag;
