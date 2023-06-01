//var extensionBody = document.getElementById('extensionBody');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      // Tab has finished loading a new page
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        var url = activeTab.url;
  
        if (url !== ""){// Send URL to API
        sendUrlToApi(url);
        }
      });
    }
  });
  
  function sendUrlToApi(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", " http://127.0.0.1:5000/detect", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    var payload = JSON.stringify({ "url": url });
    alert(payload);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Handle API response
          var response = JSON.parse(xhr.responseText);
          //extensionBody.innerHTML = str(response);
          //displayApiResponse(response);
        } else {
          // Handle API error
          displayApiError(xhr.statusText);
        }
      }
    };
  
    xhr.send(payload);
  }
  
  // function displayApiResponse(response) {
  //   const popup = document.createElement('div');
  //   popup.textContent = response; // Modify this to display the response data as desired
  
  //   // Apply CSS styles to the popup
  //   popup.style.position = 'fixed';
  //   popup.style.bottom = '20px';
  //   popup.style.right = '20px';
  //   popup.style.backgroundColor = 'green';
  //   popup.style.color = 'white';
  //   popup.style.padding = '10px';
  //   popup.style.borderRadius = '5px';
  //   popup.style.zIndex = '9999';
  
  //   // Append the popup to the body of the document
  //   document.body.appendChild(popup);
  // }
  
  // function displayApiError(error) {
  //   const popup = document.createElement('div');
  //   popup.textContent = 'API Error: ' + error;
  
  //   // Apply CSS styles to the popup
  //   popup.style.position = 'fixed';
  //   popup.style.bottom = '20px';
  //   popup.style.right = '20px';
  //   popup.style.backgroundColor = 'red';
  //   popup.style.color = 'white';
  //   popup.style.padding = '10px';
  //   popup.style.borderRadius = '5px';
  //   popup.style.zIndex = '9999';
  
  //   // Append the popup to the body of the document
  //   document.body.appendChild(popup);
  // }
