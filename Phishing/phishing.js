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
          displayApiResponse(response);
        } else {
          // Handle API error
          displayApiError(xhr.statusText);
        }
      }
    };
  
    xhr.send(payload);
  }
  
  function displayApiResponse(response) {
    // Modify this code to display the API response as per your requirements
    console.log("API response:", response);
  }
  
  function displayApiError(error) {
    // Modify this code to display the API error as per your requirements
    console.error("API error:", error);
  }
  