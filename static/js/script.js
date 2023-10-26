$(document).ready(function () {
    $("form").on("submit", function (event) {
      event.preventDefault();
      var user_prompt = $(".msger-input").val();
        
      if (user_prompt.trim() !== "") {

      // Add the user prompt to the chat
      $(".msger-chat").append(`
        <div class="msg right-msg">
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">You</div>
            </div>
            <div class="msg-text">${user_prompt}</div>
          </div>
        </div>
      `);
  
      // Clear the input box
      $(".msger-input").val("");
  
      // Scroll to the bottom of the chat
      $(".msger-chat").scrollTop($(".msger-chat")[0].scrollHeight);
  
      // Show loading skeleton inside the left chat bubble
      var loadingBubble = `
        <div class="msg left-msg">
          <div class="msg-bubble loader-skeleton">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      `;
      var loadingBubbleElement = $(loadingBubble);
      $(".msger-chat").append(loadingBubbleElement);
  
      // Scroll to the bottom of the chat
      $(".msger-chat").scrollTop($(".msger-chat")[0].scrollHeight);
  
      $.ajax({
        url: "/get_response",
        method: "POST",
        data: { prompt: user_prompt },
        success: function (data) {
          // Replace loading skeleton with actual message
          var responseBubble = `
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">AI</div>
              </div>
              <div class="msg-text"></div>
            </div>
          `;
          var responseBubbleElement = $(responseBubble);
          loadingBubbleElement.replaceWith(responseBubbleElement);
  
          // Scroll to the bottom of the chat
          $(".msger-chat").scrollTop($(".msger-chat")[0].scrollHeight);
  
          // Animate the response text letter by letter
          var responseText = `${data.ai_response}`;
          var msgText = responseBubbleElement.find(".msg-text");
          var i = 0;
          var typingInterval = setInterval(function () {
            if (i < responseText.length) {
              msgText.append(responseText.charAt(i));
              i++;
            } else {
              clearInterval(typingInterval);
            }
          }, 20); // Adjust the typing speed as needed
        },
      });
    }});
  });