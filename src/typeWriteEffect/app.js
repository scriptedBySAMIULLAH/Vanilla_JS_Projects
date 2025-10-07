let arr;
      let msg1 = "Market Competitive salary";
      let msg2 = "on your  desired domain";
      let msg3 = "gains hands on experience";
      let index = 0;
      let message = [msg1, msg2, msg3];

      function typeWriterEffect() {
        
          arr = Array.from(message[index]);
        index == message.length - 1 ? (index= 0) : index++;
        let targetElement = document.getElementById("typewriter");
        // Typing Effect
        arr.forEach((ele, i) => {
          setTimeout(() => {
            targetElement.textContent += ele;
                  if (i === arr.length - 1) {
                 // After typing finishes
                     setTimeout(() => {
                     deleteText();
                 }, 1000); // Wait before deleting
                     }
          }, i * 100);
        });


        function deleteText() {
          arr.reverse().forEach((ele, i) => {
            setTimeout(() => {
              targetElement.textContent = targetElement.textContent.slice(
                0,
                -1
              );//no need to reverse array but it gives support to track loop
                    if (i === arr.length - 1) {
                        console.log(index);
                        
                    setTimeout(() => {
                    arr.reverse();
                     typeWriterEffect();
                    }, 500);
                    }
            }, i * 100);
          });
        }
      }

      typeWriterEffect(); // Start the effect