var el = document.createElement("script");
el.textContent = "if (top !== self) {window.self = window.top;}";
document.documentElement.appendChild(el);

//Script for iFrame Detection
const r = (Math.random() + 1).toString(36).substring(2);
const r2 = (Math.random() + 1).toString(36).substring(2);
const rid = r + r2;

function fakeUI() {
  return (document.getElementById('url-bar') !== null);
}

//On load, find all iframes, add styles
function iframeFinder() {
  // Use origin displayed in the address bar unless its about:blank
  let domain = (location.origin !== "null") ? location.origin : window.origin;

  //Get domainAllow array, if exists, check if domain entry exists
  chrome.storage.local.get('domainAllow', function(domainAllowResult){
    let domainAllowResultP = domainAllowResult.domainAllow;

    if (!domainAllowResultP) {
      domainAllowResultP = [];
    }

    //If parent domain is NOT allow-listed
    if (domain === "null" || !domainAllowResultP.includes(domain)) {

      //Get src allowlist array, if exists, check if entry exists
      chrome.storage.local.get('srcAllow', function(srcAllowResult){
        let srcAllowResultP = srcAllowResult.srcAllow;

        //If the result in localStorage doesn't exist, set it to empty array []
        if (!srcAllowResultP) {
          srcAllowResultP = [];
        }

        document.querySelectorAll("iframe, frame, embed, object").forEach((frame) => {
          let src = (frame.nodeName === "OBJECT") ? frame.data : frame.src;
          //If the iframe actually has a src attribute set
          //AND if the iframe already doesn't have unique ID
          if (
            !srcAllowResultP.includes(src) &&
            src &&
            src !== "about:blank" &&
            src !== "javascript:undefined" &&
            !frame.classList.contains(rid)
          ) {
            //Give it unique ID
            frame.setAttribute("class", rid);

            //Create Warning Div
            let warningHost = document.createElement("div");
            let warningDOM = warningHost.attachShadow({mode: 'closed'});
            let warning = document.createElement("div");
            warningDOM.appendChild(warning);
            
            warningHost.classList.add("warning-" + rid);

            //iFrame Styles
            frame.style.filter = "brightness(20%)";

            //Style Warning Div
            warning.style.fontFamily = "Open Sans, Helvetica, sans-serif";
            warning.style.fontSize = "14px";

            warning.style.color = "#721C23";
            warning.style.backgroundColor = "rgb(248, 215, 217)";

            warning.style.width = "50%";
            warning.style.padding = "15px";
            warning.style.margin = "0px";
            warning.style.zIndex = "2147483647";
            warning.style.borderRadius="15px";

            warning.style.position = "fixed";
            warning.style.bottom = "0";
            warning.style.left = "0";

            warning.style.overflow = "none";
            warning.style.display = "block";

            //Create Heading and Paragraph and append them
            let warningHeading = document.createElement("h2");
            let warningText = document.createElement("p");
            let warningText2 = document.createElement("p");

            //Format URL (add elipses if too long)
            let warningURL;
            if (src.length > 50) {
              warningURL = src.substring(0, 50) + "...";
            } else {
              warningURL = src;
            }

            //Create URL element
            let urlElement = document.createElement("span");
            urlElement.textContent = warningURL;
            urlElement.title = src

            let warningAccept = document.createElement("button");
            let warningNever = document.createElement("button");

            warningHeading.textContent = "Security Alert";
            if (fakeUI()) warningHeading.textContent += " (Fake UI)";
            warningText.textContent = "An iframe element URL: ";
            warningText2.textContent = "Please ensure you trust this URL before entering any sensitive information such as passwords, emails, or credit card details.";

            warningAccept.textContent = "Close Warning";
            warningNever.title = domain
            warningNever.textContent = "Never Show Warnings On This Site";

            //Style Heading H2
            warningHeading.style.fontFamily = "Open Sans, Helvetica, sans-serif";
            warningHeading.style.color = "#721C23";
            warningHeading.style.fontWeight = "bold";

            warningHeading.style.fontSize = "14px";
            // warningHeading.style.fontWeight = "normal";

            warningHeading.style.margin = "0px";
            warningHeading.style.marginBottom = "10px";
            warningHeading.style.padding = "0px";

            //Style Parageaph p
            warningText.style.fontFamily = "Open Sans, Helvetica, sans-serif";
            warningText.style.color = "#721C23";

            warningText.style.fontSize = "12px";
            warningText.style.fontWeight = "normal";

            warningText.style.margin = "0px";
            warningText.style.marginRight = "2px";
            warningText.style.marginBottom = "10px";
            warningText.style.padding = "0px";

            warningText.style.display = "inline-block"; 

            //Style URLElement
            urlElement.style.fontFamily = "Open Sans, Helvetica, sans-serif";
            urlElement.style.fontWeight = "bold";
            urlElement.style.textDecoration = "underline";
            urlElement.style.color = "#721C23";

            urlElement.style.fontSize = "12px";

            urlElement.style.margin = "0px";
            urlElement.style.marginBottom = "10px";
            urlElement.style.padding = "0px";

            urlElement.style.display = "inline-block";

            //Style Parageaph 2 p
            warningText2.style.fontFamily = "Open Sans, Helvetica, sans-serif";
            warningText2.style.color = "#721C23";

            warningText2.style.fontSize = "12px";
            warningText2.style.fontWeight = "normal";

            warningText2.style.margin = "0px";
            warningText2.style.marginBottom = "10px";
            warningText2.style.padding = "0px";

            //Style Accept Button
            warningAccept.style.fontFamily = "Open Sans, Helvetica, sans-serif";
            warningAccept.style.color = "white";

            warningAccept.style.fontSize = "12px";
            warningAccept.style.fontWeight = "normal";

            warningAccept.style.background = "none";
            warningAccept.style.backgroundColor = "#721C23";
            warningAccept.style.border = "none";
            warningAccept.style.borderRadius = "5px";

            warningAccept.style.marginTop = "2px";
            warningAccept.style.padding = "10px";
            warningAccept.style.display = "inline-block";
            warningAccept.style.cursor = "pointer";

            warningAccept.style.marginRight = "10px";

            //Style Never Button
            warningNever.style.fontFamily = "Open Sans, Helvetica, sans-serif";
            warningNever.style.color = "#721C23";

            warningNever.style.fontSize = "12px";
            warningNever.style.fontWeight = "normal";

            warningNever.style.background = "none";
            warningNever.style.border = "solid 1px #721C23";
            warningNever.style.borderRadius = "5px";

            warningNever.style.marginTop = "2px";
            warningNever.style.padding = "10px";
            warningNever.style.display = "inline-block";
            warningNever.style.cursor = "pointer";

            //Append Heading and Paragraph to warning element
            warning.appendChild(warningHeading);
            warning.appendChild(warningText);
            warning.appendChild(urlElement)
            warning.appendChild(warningText2)

            warning.appendChild(warningAccept);
            warning.appendChild(warningNever);

            //Append warning to document
            document.body.appendChild(warningHost);

            //Event listener for Accept warning button
            warningAccept.addEventListener("click", (e) => {
              e.preventDefault();

              //Remove warning
              warning.remove();

              //iFrame Styles
              frame.style.filter = "brightness(100%)";
              frame.style.filter = "initial";

              //Add src URL to whitelist array
              if (srcAllowResultP) {
                //Check if entry for frame src exists
                if (!srcAllowResultP.includes(src)) {
                  srcAllowResultP.push(src);
                  chrome.storage.local.set({ srcAllow: srcAllowResultP });
                }
              } else {
                //Create array and push frame src to it
                let srcAllowArray = [src];
                chrome.storage.local.set({ srcAllow: srcAllowArray });
              }
            });

            //Event listener for Never Warning button
            warningNever.addEventListener("click", (e) => {
              e.preventDefault();

              //Remove all warnings
              document.querySelectorAll("div.warning-" + rid).forEach((warningDiv) => {
                warningDiv.remove()
              })

              //iFrame Styles
              frame.style.filter = "brightness(100%)";
              frame.style.filter = "initial";

              //Add parent URL to domainAllow array
              if (domainAllowResultP) {
                //Check if entry for frame src exists
                if (!domainAllowResultP.includes(domain)) {
                  domainAllowResultP.push(domain);
                  chrome.storage.local.set({ domainAllow: domainAllowResultP });
                }
              } else {
                //Create array and push frame src to it
                let domainAllowArray = [domain];
                chrome.storage.local.set({ domainAllow: domainAllowArray });
              }
            });
          } //end of if !srcAllowResultP.incluides(src)
        }); // end of forEach frame
      })// end of srcAllow check
    } //end of if !domainAllowsP.includes(domain)
  }); // end of domainAllow check
}

//Call this whenever DOM updates
iframeFinder();

//Mutation Observer
////////////////////////////////////////////////
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations, observer) {
  iframeFinder();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true,
  childList: true
});
///////////////////////////////////////////////
