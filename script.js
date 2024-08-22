console.log("lessgo jS")
let currentSong = new Audio();


function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds)||seconds>0){
        return "00:00"
    }
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;

}


async function getsongs(){
    let a = await fetch("http://127.0.0.1:5500/spotify%20clone/songs/")
    let response  = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs") [1].replaceAll("%20","").replaceAll("/","")) //url mein songs ke aage pecche ka part rakhega alag alag par 'song' ko hata dega
            console.log(element.href);
        }
    }
    return songs
 
}
const playMusic = (track)=>{
    // let audio = new Audio("/songs/" + track)
    // audio.play()
    // currentSong.src = "/songs/" + track
    currentSong.src = "http://127.0.0.1:5500/spotify%20clone/songs/El%20Billete%20-%20Edgar%20Lopez%20and%20Quincas%20Moreira.mp3"
    // console.log(track)
    currentSong.play()
    play.src = "pause.svg"
    document.querySelector(".songinfo").innerHTML = "track"
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
    
}


async function main(){

    

    //get list of songs
    let songs = await getsongs()
    console.log(songs)

    let songUL = document.querySelector(".songslist").getElementsByTagName("ul")[0]

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song}</div>
                                <div>Spracer2</div>
                            </div>
                            <img class="invert" src="play2.svg" alt=""> </li>`;
    }

    //attach eventlistener for each song
    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {

        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        });
    });

    //attach an event listner to play next and previous
    play.addEventListener("click",() =>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play2.svg"
        }
    })

    //listen for timeupdate event
    currentSong.addEventListener("timeupdate",()=>{
        console.log(currentSong.currentTime,currentSong.duration)
        // document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    })

}
main()
