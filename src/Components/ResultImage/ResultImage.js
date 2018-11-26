import React, {Component, Fragment} from 'react';
import './ResultImage.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faDownload, faSearchPlus);

const ResultImage = ({avatarImage, avatarAlt, author, image, imageAlt, link, download, url}) =>
  <Fragment>
    <a href={url} target="_blank" rel="noopener noreferrer" download><FontAwesomeIcon className="download-icon" icon="download"/></a>
    <a href={link} target="_blank" rel="noopener noreferrer"><img src={avatarImage} alt={avatarAlt} className="result-author-avatar" /></a>
    <div className="result-author-image"><a href={link} target="_blank" rel="noopener noreferrer">{author}</a></div>
    <a href={url} target="_blank" rel="noopener noreferrer"><img className="result-view" src={image} alt={imageAlt}/></a>
  </Fragment>

export default ResultImage;
