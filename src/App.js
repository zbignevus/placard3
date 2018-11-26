import React, {Component, Fragment} from 'react';

import Search from './Components/Search/Search.js';
import SearchTag from './Components/SearchTag/SearchTag.js';
import ResultImage from './Components/ResultImage/ResultImage.js';

import axios from 'axios';

 

const DEFAULT_QUERY = "cars";
const PATH_BASE = 'https://api.unsplash.com';
const PATH_SEARCH = '/search/photos';
const PARAM_SEARCH = 'query=';
const PARAM_CLIENT_ID = "client_id=";
const CLIENT_ID= "ca6fee0f88df528c206afa9b4d1dacdbc29febc2684aee9ece11f69dacaa7459";
const PARAM_PER_PAGE = "&per_page=";
const PER_PAGE = 30;
const req = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${""}&${PARAM_CLIENT_ID}${CLIENT_ID}`;

const columnLength = Math.floor(PER_PAGE / 3);

class App extends Component{
constructor(props){
  super(props);

  this.state = {
    columnLength: 5,
    tags: [],
    searchKey: null,
    error: null,
    results: [],
    isLoading: false,
  }
}

onSetQuery = (e) => {
  const tags = this.state.tags.slice();

 (tags.includes(e.target.value) ? tags : tags.push(e.target.value))
  &&
    e.keyCode === 13
  &&
    this.setState({
      searchKey: e.target.value,
      tags,
      results:[],
    })

  e.keyCode === 13 && this.fetchQuery(e.target.value)

}

fetchQuery = (searchKey) => {
  this.setState({
    isLoading: true,
  })
  axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchKey}&${PARAM_PER_PAGE}${PER_PAGE}&${PARAM_CLIENT_ID}${CLIENT_ID}`)
    .then(result => this.setResult(result.data))
    .catch(error => this.setState({ error }));

}


setResult = (data) => {
  const results = this.state.results.slice();
  data.results.map(result => {
    results.push(
      {
        id: result.id,
        image: result.urls.regular,
        avatarImage: result.user.profile_image.small,
        avatarAlt: result.user.username,
        author: result.user.name,
        link: result.user.links.html,
        download: result.links.download,
        url: result.urls.raw,
      }
    )
  })

  this.setState({
    results,
    isLoading: false,
  })
  console.log(results);
}

handleDismiss = (tag) => {
  const filteredTags = this.state.tags.filter(tagItem => tagItem !== tag);

  this.setState({
    tags: filteredTags,
  })

}

handleTagClick = (tag) => {

  this.setState({
    searchKey: tag,
    results:[],
  })

  this.fetchQuery(tag);

}

componentDidMount(){

  this.fetchQuery("random");

}



  render(){
    return(

      <div className="app-container">

          <div className="top-container">
            <div className="searchField-container">
              <div className="logo"><h1>Placard</h1><small>image search</small></div>
              <Search handleKeyPress={this.onSetQuery}/>
            </div>

            <div className="searchTags-container">

              { this.state.tags.map( tag => <SearchTag tag={tag} key={tag} onClick={() =>this.handleTagClick(tag)} onDismiss={() =>this.handleDismiss(tag)}/> ) }

            </div>
          </div>

          <div className="content-container">
                <div className="content-container-row">
                  {this.state.isLoading
                  ? <h2>Retrieving results...</h2>
                  :
                    (this.state.results[0] != null
                    ? <ResultColumns results={this.state.results} columnLength={columnLength}/>
                    : <h2>No results found.</h2>
                    )

                  }
                </div>
          </div>

      </div>
    )
  }
}


const ResultColumns = ({results, columnLength}) => {
  const resultGrid = [];

  for(let i=0, j=0; i<3; i++){
      let imageResultColumn = results.slice(j, j+=columnLength);
      console.log(imageResultColumn);
      resultGrid.push(
        <div className="content-container-column">
                {imageResultColumn.map(imageResult =>
                      <div className="content-result-container" key={imageResult.id}>

                        <ResultImage
                          image={imageResult.image}
                          avatarImage={imageResult.avatarImage}
                          avatarAlt={imageResult.avatarAlt}
                          author={imageResult.author}
                          link={imageResult.link}
                          download={imageResult.download}
                          url={imageResult.url}
                          />

                      </div>
                    )
                }
        </div>
    )
  }
  return resultGrid;

  }

export default App;
