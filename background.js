
chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes("linkedin.com/mynetwork/invitation-manager")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: acceptAllRequests
      });
    } else {
      alert("Please navigate to the LinkedIn Invitations page.");
    }
  });
  
  function acceptAllRequests() {
    try {
      const buttons = document.querySelectorAll('button.artdeco-button--secondary');
      let acceptedCount = 0;
  
      buttons.forEach(button => {
        if (button.innerText.trim() === 'Accept') {
          button.click();
          acceptedCount++;
        }
      });
  
      console.log(`Accepted ${acceptedCount} connection requests.`);
  
      //this will handle pagination 
      const nextButton = document.querySelector('button.artdeco-pagination__button--next');
      if (nextButton && !nextButton.disabled) {
        nextButton.click();
        setTimeout(acceptAllRequests, 3000); 
      } else {
        console.log("No more pages to process.");
      }                                        //for error handling
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }