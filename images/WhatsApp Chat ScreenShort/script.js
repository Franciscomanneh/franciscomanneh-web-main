document.addEventListener('DOMContentLoaded', () => {
    // Chat data (simulated database)
    const chatData = {
        1: {
            name: "CODING CLASS",
            img: "images/IMG-20240111-WA0032.jpg", // Person eating food with colorful shirt
            messages: [
                { content: "Hey everyone, let's discuss the new project", sender: "other", time: "10:30" },
                { content: "I think we should start with the database schema", sender: "me", time: "10:35" },
                { content: "Good point! I've drafted some initial tables", sender: "other", time: "10:40" },
                { content: "Let me know what you think about my proposal", sender: "other", time: "10:42" },
                { content: "Looks great! Let's implement it", sender: "me", time: "10:45" }
            ]
        },
        
        2: {
            name: "Web Development",
            img: "images/IMG-20240212-WA0013.jpg", // Woman in white jacket
            messages: [
                { content: "How's the frontend coming along?", sender: "other", time: "9:15" },
                { content: "Almost done with the responsive design", sender: "me", time: "9:20" },
                { content: "Great work! The client will be happy", sender: "other", time: "9:25" },
                { content: "Should we add more animations?", sender: "me", time: "9:30" },
                { content: "Let's keep it simple for now", sender: "other", time: "9:35" }
            ]
        },
        3: {
            name: "Ancha Gaye",
            img: "images/IMG-20240214-WA0024.jpg", // Woman in blue top
            messages: [
                { content: "Are you coming to the meeting?", sender: "other", time: "8:00" },
                { content: "Yes, I'll be there at 3", sender: "me", time: "8:05" },
                { content: "Perfect! Don't forget the documents", sender: "other", time: "8:10" },
                { content: "Got them ready", sender: "me", time: "8:12" },
                { content: "Ok", sender: "other", time: "9:16" }
            ]
        },
        4: {
            name: "Computer Science",
            img: "images/IMG-20240228-WA0005.jpg", // Formal attire at MDI
            messages: [
                { content: "Did you finish the algorithm assignment?", sender: "other", time: "7:00" },
                { content: "Still working on the optimization part", sender: "me", time: "7:10" },
                { content: "Let me know if you need help", sender: "other", time: "7:15" },
                { content: "Thanks, I'll get back to you soon", sender: "me", time: "7:20" },
                { content: "Meeting tomorrow at 9", sender: "other", time: "7:30" }
            ]
        },
        5: {
            name: "Math Group",
            img: "images/IMG-20240228-WA0008.jpg", // Red hoodie at MDI
            messages: [
                { content: "The calculus homework is tough!", sender: "other", time: "5:00" },
                { content: "I'm stuck on problem 3", sender: "me", time: "5:15" },
                { content: "Let's meet in the library to work on it", sender: "other", time: "5:30" },
                { content: "Sure, how about 4 PM?", sender: "me", time: "5:40" },
                { content: "Don't forget the assignment!", sender: "other", time: "5:49" }
            ]
        }
    };

    // Elements
    const chatItems = document.querySelectorAll('.chat-item');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const chatContent = document.querySelector('.chat-content');
    const messageContainer = document.getElementById('message-container');
    const currentChatName = document.getElementById('current-chat-name');
    const currentChatImg = document.getElementById('current-chat-img');
    const messageInput = document.querySelector('.message-input input');
    const micButton = document.querySelector('.message-input .fa-microphone');

    // Voice recording variables
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;
    let recordingTimer;
    let recordingDuration = 0;

    // Add event listeners to each chat item
    chatItems.forEach(chat => {
        chat.addEventListener('click', () => {
            // Remove active class from all chats
            chatItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked chat
            chat.classList.add('active');
            
            // Hide welcome screen and show chat content
            welcomeScreen.style.display = 'none';
            chatContent.style.display = 'flex';
            
            // Get chat ID and load conversation
            const chatId = chat.getAttribute('data-chat-id');
            loadChat(chatId);
        });
    });

    // Function to load a chat conversation
    function loadChat(chatId) {
        // Get chat data
        const chat = chatData[chatId];
        
        // Update chat header
        currentChatName.textContent = chat.name;
        currentChatImg.src = chat.img;
        
        // Clear previous messages
        messageContainer.innerHTML = '';
        
        // Add messages
        chat.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender === 'me' ? 'sent' : 'received'}`;
            
            messageDiv.innerHTML = `
                <div class="message-content">${msg.content}</div>
                <div class="message-timestamp">${msg.time}</div>
            `;
            
            messageContainer.appendChild(messageDiv);
        });
        
        // Scroll to bottom of conversation
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Handle message input
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            const activeChat = document.querySelector('.chat-item.active');
            if (activeChat) {
                const chatId = activeChat.getAttribute('data-chat-id');
                const chat = chatData[chatId];
                
                // Create a new message
                const newMessage = {
                    content: this.value.trim(),
                    sender: 'me',
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                };
                
                // Add to chat data
                chat.messages.push(newMessage);
                
                // Add to UI
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message sent';
                
                messageDiv.innerHTML = `
                    <div class="message-content">${newMessage.content}</div>
                    <div class="message-timestamp">${newMessage.time}</div>
                `;
                
                messageContainer.appendChild(messageDiv);
                
                // Clear input
                this.value = '';
                
                // Scroll to bottom
                messageContainer.scrollTop = messageContainer.scrollHeight;
            }
        }
    });

    // Handle microphone button
    micButton.addEventListener('click', function() {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });

    // Start voice recording
    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            
            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });
            
            mediaRecorder.addEventListener('stop', () => {
                // Convert recorded audio to a playable format
                const audioBlob = new Blob(audioChunks);
                sendVoiceMessage(audioBlob);
                
                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
                
                // Reset UI
                micButton.classList.remove('recording');
                isRecording = false;
                clearInterval(recordingTimer);
                recordingDuration = 0;
            });
            
            // Start recording
            mediaRecorder.start();
            isRecording = true;
            micButton.classList.add('recording');
            
            // Start timer
            recordingTimer = setInterval(() => {
                recordingDuration++;
                console.log(`Recording: ${formatTime(recordingDuration)}`);
            }, 1000);
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    }
    
    // Stop voice recording
    function stopRecording() {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
        }
    }
    
    // Send voice message
    function sendVoiceMessage(audioBlob) {
        const activeChat = document.querySelector('.chat-item.active');
        if (activeChat) {
            const chatId = activeChat.getAttribute('data-chat-id');
            const chat = chatData[chatId];
            
            // Create audio URL
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Create a new message
            const newMessage = {
                content: `<audio controls src="${audioUrl}"></audio>`,
                sender: 'me',
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                isVoice: true
            };
            
            // Add to chat data
            chat.messages.push(newMessage);
            
            // Add to UI
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <audio controls src="${audioUrl}"></audio>
                    <span class="voice-duration">${formatTime(recordingDuration)}</span>
                </div>
                <div class="message-timestamp">${newMessage.time}</div>
            `;
            
            messageContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Simple search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        chatItems.forEach(chat => {
            const chatName = chat.querySelector('h3').textContent.toLowerCase();
            const lastMessage = chat.querySelector('.last-message span').textContent.toLowerCase();
            
            // Show/hide based on match in name or last message
            if (chatName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
                chat.style.display = 'flex';
            } else {
                chat.style.display = 'none';
            }
        });
    });
}); 