
const videoInput = document.querySelector("#videoInput");
const videoBtn = document.querySelector("#videoBtn");
const videoPlayer = document.querySelector("#main");
const totalDuration = document.querySelector("#duration");
const currentTime = document.querySelector("#current")
const progress_bar = document.querySelector("#video-progress-bar");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const videoElemnt = document.createElement("video");



const handleinput =()=>
{
    videoInput.click();

} 
const acceptinputhandler= (obj) =>
{
    const selectVideo= obj.target.files[0];
    const link = URL.createObjectURL(selectVideo);
    videoElemnt.src= link;
    videoElemnt.setAttribute("class","video");
    videoElemnt.controls="true";
    videoPlayer.appendChild(videoElemnt);
    videoElemnt.play();

    
    // total duration of video===========
    videoElemnt.addEventListener("loadedmetadata", (e) =>
    {
        console.log("Metadata loaded");
        let videoDuration = e.target.duration;
        let totalMin = Math.floor(videoDuration / 60);
        let totalSec = Math.floor(videoDuration % 60);  
        totalSec < 10 ? totalSec = "0" + totalSec : totalSec;   
        totalDuration.innerHTML = `${totalMin}:${totalSec}`;
    });
    //  current duration of the video
    const updateProgressBar = () => {
        if (videoElemnt) {
            let currentVideoTime = videoElemnt.currentTime;
            let videoDuration = videoElemnt.duration;
            let progressWidth = (currentVideoTime / videoDuration) * 100;
            progress_bar.style.width = `${progressWidth}%`;

            // Update current time display
            let currentMin = Math.floor(currentVideoTime / 60);
            let currentSec = Math.floor(currentVideoTime % 60);
            currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
            currentTime.innerHTML = `${currentMin}:${currentSec}`;
        }

        // Call updateProgressBar on the next animation frame
        requestAnimationFrame(updateProgressBar);
    };

    // Start smooth progress bar update
    videoElemnt.addEventListener('play', () => {
        requestAnimationFrame(updateProgressBar);
    });


    
    

    
    


}

videoBtn.addEventListener("click",handleinput);
videoInput.addEventListener("change",acceptinputhandler);

//====================================================


// will work on speed and volume button of video

const volumeup = document.querySelector("#volumeup");
const volumedown = document.querySelector("#volumedown");
const speedup = document.querySelector("#speedup");
const speeddown = document.querySelector("#speeddown");
const toast = document.querySelector(".toast");

// ====================================================

const speeduphandler= ()=>
{
    

    const videoElemnt = document.querySelector("video")
    if(videoElemnt== null)
    {
        return;
    }
    if(videoElemnt.playbackRate>4)
    {
        return
    }
    const increasedSpeed = videoElemnt.playbackRate + 0.5;
    videoElemnt.playbackRate = increasedSpeed;
    console.log("after speed is:",increasedSpeed)
    toastMessage(increasedSpeed+ "X");
    
}
speedup.addEventListener("click", speeduphandler);

// =====================================================

const speeddownhandler =()=>
{
    const videoElemnt = document.querySelector("video")
    if(videoElemnt== null)
    {
        return;
    }
    if(videoElemnt.playbackRate<=0.1)
    {
        return;
    }
    
    const decreasedSpeed = videoElemnt.playbackRate - 0.5;
    videoElemnt.playbackRate = decreasedSpeed;
    console.log("after speed is:",decreasedSpeed)
    toastMessage(decreasedSpeed+ "X");

}

speeddown.addEventListener("click", speeddownhandler)

// ==================================================
const volumeuphandler =()=>
{
    const videoElemnt= document.querySelector("video");
    if(videoElemnt== null)
    {
        return;
    }
    if(videoElemnt.volume>=0.99)
    {
        return
    }
    videoElemnt.volume = videoElemnt.volume + 0.1;
    console.log("new volume:", videoElemnt.volume);
    const increasedVolume=videoElemnt.volume*100+"%"
    toastMessage(increasedVolume);
}
volumeup.addEventListener("click", volumeuphandler);

// ================================================

const volumedownhandler =()=>
    {
        const videoElemnt= document.querySelector("video");
        if(videoElemnt== null)
        {
            return;
        }
        if(videoElemnt.volume<=0)
        {
            return
        }
        videoElemnt.volume = videoElemnt.volume - 0.1;
        console.log("new decreased volume:", videoElemnt.volume);
        const decreasedVolume=videoElemnt.volume*100+"%"
        toastMessage(decreasedVolume);
    }
    
volumedown.addEventListener("click", volumedownhandler);
// =========================================================
function toastMessage(message)
{   
    toast.textContent=message;
    toast.style.display="block";

    setTimeout( ()=>{
        toast.style.display="none";
    },1500);

}

// =======================controls===========//
const fullScreenhandler=()=>
{
    videoPlayer.requestFullscreen();
}


const fullScreenElem = document.querySelector("#fullScreen");
fullScreenElem.addEventListener("click", fullScreenhandler)

// ==============================play-pause-control========

playBtn.addEventListener("click", () => {
    videoElemnt.play(); // Start the video
    playBtn.style.display = "none"; // Hide Play button
    pauseBtn.style.display = "inline-block"; // Show Pause button
});

// Event listener for the Pause button
pauseBtn.addEventListener("click", () => {
    videoElemnt.pause(); // Pause the video
    pauseBtn.style.display = "none"; // Hide Pause button
    playBtn.style.display = "inline-block"; // Show Play button
});

// Optional: Reset the button when the video ends
videoElemnt.addEventListener("ended", () => {
    pauseBtn.style.display = "none"; // Hide Pause button
    playBtn.style.display = "inline-block"; // Show Play button
});