import React from 'react';


function SearchBox(props) {

  const openArticle=()=>{
    window.open(props.article.link, "_blank")
  }

  console.log(props.article);
  return (
    <div >
      <h3 onClick={openArticle}> {props.article.title} </h3>
      {props.article.media &&<img source={props.article.media} alt="" style={{ width:"60%", border:1}}/>}
      <p onClick={openArticle}>
        {props.article.summary}
      </p>
      <p onClick={openArticle}>
        {props.article.author}
        {props.article.published_date}
      </p>
    </div>
  );
}

export default SearchBox;
