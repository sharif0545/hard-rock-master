document.getElementById('search-btn').addEventListener('click', function(){
    const showSongList =  document.getElementById('song-list');
    const searchInput = document.getElementById('search-input').value;
    let showSong = '';
    const apiURL = 'https://api.lyrics.ovh';

    fetch(`${apiURL}/suggest/${searchInput}`)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < 10; i++){
			
            const songName = data.data[i];
            // console.log(songName);
			      const songID = songName.id;
            // console.log(songID);
            const title = songName.title;
            //  console.log(title);
            const artist = songName.artist.name;
            //    console.log(artist);
            const fullSong = `${title} Album by ${artist}`;
            // console.log(fullSong);
            const innerTag = `
              <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${title}</h3>
                    <p class="author lead">Album by <span>${artist}</span></p>
                    
                </div>
                   <div class="col-md-3 text-md-right text-center">
                       <button class="btn btn-success" onclick = "getFullSong('${songName.title}','${songName.artist.name}')" class="btn btn-success">Get Lyrics</button>
                   </div>
              </div>`;
            // showTitle.innerHTML += title;
            showSong += innerTag;
            
        }showSongList.innerHTML = showSong;

    })
     
});


  function getFullSong(title, artist){
    const lyricsTitle = document.getElementById('lyrics-title');
    const lyricsShow = document.getElementById('lyrics');
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data =>{
      // console.log(data);
      lyricsTitle.innerText = `${title}`;
      // lyricsShow.innerHTML = data.lyrics;

      if(lyricsShow.innerHTML !== 'undefined'){
        lyricsShow.innerHTML = data.lyrics;
      }
      else{
        lyricsShow.innerHTML = 'Lyrics not found.'; 
      }
      

    })
  }





