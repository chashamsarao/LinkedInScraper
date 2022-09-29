// This is content script

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if(msg.todo == "toggle") {
        slider();
    }
    });

function main() {
     
    // (appears on clicking extension
    // icon)
    var sliderInnerHTMLString = `\
    <!-- HEADER IS HERE -->\
    <div id='sheader'>\
    <div id='sheaderheader'></div>\
    <div id='deepscancontainer'>\
    <label id='deepscanlabel' for='deepscan'>Deepscan?<input type='checkbox' name='deepscan' id='deepscan' value='deepscan'/></label>\
    </div>\
    </div>\
    <br/>\
    <h2>Education</h2>\
    <br/>\
    `;
    
    
    sliderGen(sliderInnerHTMLString);
  
}

    //slider window element generator
    async function sliderGen(sliderInnerHTMLString) {
    var slider = document.createElement("div");
    slider.id = "slider";
    slider.style.backgroundColor = "pink";
    slider.style.width = "600px";
    
    var educationDataToBeAdded = await extract()
    var educationElement = document.createElement('p')
    educationElement.innerHTML = educationDataToBeAdded;
    var sliderDivInnerHTML = sliderInnerHTMLString;
    
    slider.innerHTML += sliderDivInnerHTML;
    
    slider.appendChild(educationElement)

    document.body.prepend(slider);
}
    
    //slider function to toggle the slider frame
    function slider() {
        var sliderElement = document.getElementById("slider");

        //toggle slider
        if(sliderElement) {
            sliderElement.remove();
        } else {
            main();
        }
    }

    async function extract() {
    let educationData = '';
    // extracting education section
    const parent = document.querySelector('div#education').parentElement;
    let childnodes = parent.childNodes;
    
    //All the education data is always contained within the 15th node. With help of innerText property we can access this data
    let eduData = childnodes[14].innerText.replace(/[\n]/gm, '<br>');
    educationData += eduData;
    //Code to remove duplicate values from the education data
    const educationDataArray = educationData.split('<br>');
    const setData = new Set(educationDataArray);
    //set back to array
    educationData = [...setData];
    // Below is what you we will as the JSON response in the console
    let consoleJSONResponse = {
        Education : JSON.stringify(educationData)
    }
    //array back to string >> We are converting to string separated by '<br>' tag so that we can append this to our sliderInnerHTMLString to display at the top of the page.
    educationData = educationData.join('<br>')
   
    console.log('JSON response ', consoleJSONResponse)
    return educationData 
    }
    