console.log("welcome to musify");
// ..initialise the variables
let songindex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName')
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {SongName:"jiddi dil" , filePath:"songs/1.mp3" ,coverPath:"covers/1.jpg"},
    {SongName:"chak de india" , filePath:"songs/2.mp3" ,coverPath:"covers/2.jpg"},
    {SongName:"ruk jaana nahi" , filePath:"songs/3.mp3" ,coverPath:"covers/3.jpg"},
    {SongName:"besabriyan" , filePath:"songs/4.mp3" ,coverPath:"covers/4.jpg"},
    {SongName:"teri baari" , filePath:"songs/5.mp3" ,coverPath:"covers/5.jpg"},
    {SongName:"faded" , filePath:"songs/6.mp3" ,coverPath:"covers/6.jpg"},
    {SongName:"mere samne wali" , filePath:"songs/7.mp3" ,coverPath:"covers/7.jpg"},
    {SongName:"aapki nazron" , filePath:"songs/8.mp3" ,coverPath:"covers/8.jpg"},
    {SongName:"falak tu garaz" , filePath:"songs/9.mp3" ,coverPath:"covers/9.jpg"},
    {SongName:"woh kisna hai" , filePath:"songs/10.mp3" ,coverPath:"covers/10.jpg"},
]
songItems.forEach((element,i)=>{
    // console.log(element,i);
 element.getElementsByTagName("img")[0].src=songs[i].coverPath;
 element.getElementsByClassName("songName")[0].innerText=songs[i].SongName;
})


// audioElement.play();



//handle play pause click ..Playing the song
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})


//listen to events
audioElement.addEventListener('timeupdate' ,()=>{  
    //update seekbar  
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('change',()=>{
    //audio seek
    audioElement.currentTime=myprogressbar.value*audioElement.duration/100;

}) 

const makeAllPlays= ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click',(e)=>{
    
    makeAllPlays();
    songindex=parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src=`songs/${songindex+1}.mp3`;
    masterSongName.innerText=songs[songindex].SongName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  })
})
document.getElementById('next').addEventListener('click' ,()=>{
    if(songindex>=9){
        songindex=0;
    }else{
        songindex+=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    audioElement.currentTime=0;
    masterSongName.innerText=songs[songindex].SongName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');


})


document.getElementById('previous').addEventListener('click' ,()=>{
    if(songindex<=0){
        songindex=9;
    }else{
        songindex-=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    masterSongName.innerText=songs[songindex].SongName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');


})

