/* ==========================================================================
   SmileBright Dental - Chatbot Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const notificationBadge = chatToggleBtn.querySelector('.notification-badge');
    const quickRepliesContainer = document.getElementById('quick-replies');
    const typingIndicator = document.getElementById('typing-indicator');

    // Booking Form Elements
    const bookingFormOverlay = document.getElementById('booking-form-overlay');
    const closeBookingFormBtn = document.getElementById('close-booking-form');
    const appointmentForm = document.getElementById('appointment-form');

    // Mobile Nav Menu Elements
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // --- State Variables ---
    let isChatOpen = false;
    let isFirstOpen = true;

    // --- FAQ Answers Knowledge Base ---
    const KNOWLEDGE_BASE = {
        greetings: {
            keywords: ['hello', 'hi', 'hey', 'greetings', 'hola', 'morning', 'afternoon', 'evening'],
            response: "Hi there! Welcome to SmileBright Dental. I'm your virtual assistant. How can I help you today?"
        },
        bye: {
            keywords: ['bye', 'goodbye', 'see you', 'thanks', 'thank you', 'awesome', 'great', 'perfect', 'cool'],
            response: "You are welcome! Let me know if there's anything else I can help with. Have a beautiful, bright day! 😊"
        },
        services: {
            keywords: ['service', 'services', 'offer', 'treatment', 'treatments', 'do you do', 'cleaning', 'checkup', 'filling', 'whitening', 'cosmetic', 'ortho', 'braces', 'extraction', 'root canal'],
            response: "At SmileBright Dental, we offer a comprehensive range of family and cosmetic dentistry, including:\n\n" +
                      "• <strong>Routine Cleanings & Exams</strong> (preventative hygiene)\n" +
                      "• <strong>Teeth Whitening</strong> (in-office and take-home treatments)\n" +
                      "• <strong>Cosmetic Veneers & Bonding</strong>\n" +
                      "• <strong>Orthodontics & Invisalign</strong>\n" +
                      "• <strong>Emergency Dental Care</strong> (root canals, extractions, crowns)\n\n" +
                      "Would you like to schedule an appointment for one of these?",
            showBookingBtn: true
        },
        pricing: {
            keywords: ['price', 'pricing', 'cost', 'fee', 'fees', 'expensive', 'whitening cost', 'cleaning cost', 'rate', 'rates', 'how much'],
            response: "We believe in clear and affordable pricing! Here are some estimates for common services:\n\n" +
                      "• <strong>New Patient Exam & Cleaning:</strong> $99 special (normally $199)\n" +
                      "• <strong>Professional Teeth Whitening:</strong> Packages starting at $299\n" +
                      "• <strong>Invisalign Consultation:</strong> FREE (plans start at $199/month)\n" +
                      "• <strong>Dental Chatbot Licensing:</strong> $300/month for clinics wanting automated assistant services.\n\n" +
                      "We accept financing through CareCredit, and offers flexible payment structures. We'd be happy to check your benefits for you!",
            showBookingBtn: true
        },
        insurance: {
            keywords: ['insurance', 'ppo', 'covered', 'delta', 'cigna', 'metlife', 'guardian', 'aetna', 'pay', 'financing', 'copay'],
            response: "We accept most major PPO dental insurance plans, including Delta Dental, Cigna, MetLife, Guardian, Humana, UnitedHealthcare, and Aetna. We do the direct billing so you don't have to deal with paperwork!\n\n" +
                      "If you are uninsured, we have an <strong>In-House Smile Membership Club</strong> starting at $29/month, which covers all cleanings and gives a 20% discount on other treatments. Let us know if you'd like to sign up!"
        },
        hours: {
            keywords: ['hour', 'hours', 'open', 'close', 'schedule', 'time', 'saturday', 'sunday', 'weekend', 'days'],
            response: "Our office hours are:\n\n" +
                      "• <strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM\n" +
                      "• <strong>Saturday:</strong> 9:00 AM - 2:00 PM\n" +
                      "• <strong>Sunday:</strong> Closed (Emergency hotline active)\n\n" +
                      "Would you like to book a slot during our business hours?",
            showBookingBtn: true
        },
        location: {
            keywords: ['location', 'address', 'where', 'direction', 'directions', 'find', 'map', 'parking', 'austin', 'site'],
            response: "SmileBright Dental is located in the heart of downtown Austin:\n\n" +
                      "📍 <strong>123 Main Street, Austin, TX 78701</strong>\n\n" +
                      "🚗 <strong>Parking:</strong> We have a free dedicated patient parking lot directly behind the clinic building. Standard street parking is also available."
        },
        emergency: {
            keywords: ['emergency', 'accident', 'pain', 'severe', 'painful', 'broke', 'broken', 'toothache', 'after hours', 'bleeding', 'knocked out', 'swelling'],
            response: "🚨 If you are experiencing a severe dental emergency, please call our 24/7 emergency line directly at <a href='tel:(512)555-0123'><strong>(512) 555-0123</strong></a>.\n\n" +
                      "We reserve same-day booking slots daily for dental crises such as cracked teeth, extreme nerve pain, or lost crowns. Please let us know if you want to request a standard request online now.",
            showBookingBtn: true
        },
        book: {
            keywords: ['book', 'booking', 'appointment', 'appoint', 'reserve', 'schedule', 'slot', 'check', 'dental visit', 'visit', 'consultation', 'consult', 'meet', 'calendar'],
            response: "I can absolutely help you schedule a dental visit! I've opened up our booking request form. Please enter your preferred date and contact details in the overlay panel.",
            triggerForm: true
        },
        chatbot_info: {
            keywords: ['system', 'bot', 'website', 'subscription', 'software', 'lead', 'qualification', 'real person', 'human'],
            response: "I am a SmileBright Assistant bot built as an website landing demonstration. My job is to qualify dental leads, automate repetitive patient scheduling, and help practice managers get more patients 24/7. This system can be customized for any dental clinic logo and pricing. Would you like to schedule a demo?"
        }
    };

    // --- Helper Functions ---

    /**
     * Get local time in short format (e.g. 1:45 PM)
     */
    function getFormattedTime() {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }

    /**
     * Add a message bubble to the chat container list
     */
    function addMessage(sender, text, isHtml = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-msg', sender);

        const avatarMarkup = sender === 'bot'
            ? `<div class="avatar-chat"><i class="fa-solid fa-user-doctor"></i></div>`
            : `<div class="avatar-chat"><i class="fa-solid fa-user"></i></div>`;

        let bubbleContent = text;
        // Escape content unless specifically allowed as HTML (e.g. bolding/links in responses)
        if (!isHtml) {
            bubbleContent = text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;")
                .replace(/\n/g, "<br>");
        } else {
            // Convert newline chars to br nodes for styling safety
            bubbleContent = text.replace(/\n/g, "<br>");
        }

        messageDiv.innerHTML = `
            ${avatarMarkup}
            <div class="msg-content-wrapper">
                <div class="msg-bubble">${bubbleContent}</div>
                <span class="msg-meta">${getFormattedTime()}</span>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        scrollChatToBottom();
    }

    /**
     * Automatically scroll the message view to the very bottom
     */
    function scrollChatToBottom() {
        // Allow DOM to settle before scroll sizing height checks
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 50);
    }

    /**
     * Show Typing indicators element
     */
    function showTypingIndicator() {
        typingIndicator.classList.remove('hidden');
        scrollChatToBottom();
    }

    /**
     * Hide Typing indicators element
     */
    function hideTypingIndicator() {
        typingIndicator.classList.add('hidden');
    }

    /**
     * Matching engine that screens queries for matching dentist questions
     */
    function matchResponse(userMessage) {
        const cleanMsg = userMessage.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g,"");
        const tokens = cleanMsg.split(/\s+/);

        let bestMatch = null;
        let highestSubMatchCount = 0;

        // Loop over the keys in our knowledge base
        for (const category in KNOWLEDGE_BASE) {
            const data = KNOWLEDGE_BASE[category];
            let mathCount = 0;

            // Check details for exact key matching combinations
            data.keywords.forEach(keyword => {
                if (cleanMsg.includes(keyword)) {
                    mathCount += 2; // contains heavy keyword matches
                }
                tokens.forEach(tk => {
                    if (tk === keyword) {
                        mathCount += 1;
                    }
                });
            });

            if (mathCount > highestSubMatchCount) {
                highestSubMatchCount = mathCount;
                bestMatch = data;
            }
        }

        // Return matched category structure or standard fallbacks
        if (highestSubMatchCount > 0 && bestMatch) {
            return bestMatch;
        }

        return {
            response: "I'm not sure I fully understand. I can help you with typical clinic questions such as hours, services, pricing, insurance details, finding our location, or booking an appointment request. What would you like to know?",
            showBookingBtn: true
        };
    }

    /**
     * Trigger simulated response loop with typing ticks
     */
    function triggerBotResponse(userMsgText) {
        showTypingIndicator();

        // 1.2 to 1.8 seconds artificial delay for human-like feeling
        const delay = 1000 + Math.random() * 800;

        setTimeout(() => {
            hideTypingIndicator();
            const match = matchResponse(userMsgText);

            // Render the response bubble
            addMessage('bot', match.response, true);

            // Check if booking button should be nested beneath the bot's response bubble
            if (match.showBookingBtn) {
                addBookingButtonLink();
            }

            // Check if booking form overlay should be instantly auto-triggered
            if (match.triggerForm) {
                setTimeout(() => {
                    openBookingForm();
                }, 400);
            }
        }, delay);
    }

    /**
     * Append inline clickable link button for appointments
     */
    function addBookingButtonLink() {
        const lastMsgWrapper = chatMessages.lastElementChild.querySelector('.msg-content-wrapper');
        if (lastMsgWrapper) {
            const bookingBtn = document.createElement('button');
            bookingBtn.className = 'chat-btn-link';
            bookingBtn.innerHTML = `<i class="fa-regular fa-calendar-check"></i> Book Online Now`;
            bookingBtn.addEventListener('click', () => {
                openBookingForm();
            });
            lastMsgWrapper.querySelector('.msg-bubble').appendChild(document.createElement('br'));
            lastMsgWrapper.querySelector('.msg-bubble').appendChild(bookingBtn);
            scrollChatToBottom();
        }
    }

    // --- UI Interactions / Action Logic ---

    // Toggle Chat visibility
    function toggleChat() {
        isChatOpen = !isChatOpen;

        const bubbleIcon = chatToggleBtn.querySelector('.bubble-icon');
        const closeIcon = chatToggleBtn.querySelector('.close-icon');

        if (isChatOpen) {
            chatContainer.classList.remove('hidden-chat');
            bubbleIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            notificationBadge.style.display = 'none'; // hide alerts once opened
            chatInput.focus();

            // Initial dental assistant welcome greet on first open
            if (isFirstOpen) {
                isFirstOpen = false;
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    addMessage('bot', "Hello! Thank you for visiting SmileBright Dental. I'm your digital dental assistant. 🦷\n\nHow can I help you today? You can ask about our services, clinic hours, insurance coverage, pricing plans, or trigger appointment scheduling.", true);
                }, 800);
            }
        } else {
            chatContainer.classList.add('hidden-chat');
            bubbleIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            // Close form overlay if it was open
            closeBookingForm();
        }
    }

    // Custom Open Form Overlay handler
    function openBookingForm() {
        bookingFormOverlay.classList.remove('hidden');
        // Set default minimum date limit on input calendar to today's date
        const dateInput = document.getElementById('preferred-date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Custom Close Form Overlay handler
    function closeBookingForm() {
        bookingFormOverlay.classList.add('hidden');
    }

    // Send Input Event
    function handleMessageSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Render user message bubble
        addMessage('user', text);
        chatInput.value = '';

        // Trigger bot responses
        triggerBotResponse(text);
    }

    // --- Hook Event Listeners ---

    // Floating Bubble / Close Header clicks
    chatToggleBtn.addEventListener('click', toggleChat);
    chatCloseBtn.addEventListener('click', toggleChat);

    // Click on quick replies
    quickRepliesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply-btn')) {
            const trigger = e.target.getAttribute('data-trigger');
            let userQuery = '';

            if (trigger === 'services') userQuery = 'What dental services do you offer?';
            else if (trigger === 'hours') userQuery = 'What are your clinic hours?';
            else if (trigger === 'book') userQuery = 'I would like to book a dental appointment';

            if (userQuery) {
                addMessage('user', userQuery);
                triggerBotResponse(userQuery);
            }
        }
    });

    // Send button event
    chatSendBtn.addEventListener('click', handleMessageSend);

    // Input text field events (Enter key)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleMessageSend();
        }
    });

    // Appointment Form Close click
    closeBookingFormBtn.addEventListener('click', closeBookingForm);

    // Appointment Form Submission logic
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve field inputs
        const nameVal = document.getElementById('patient-name').value.trim();
        const phoneVal = document.getElementById('patient-phone').value.trim();
        const emailVal = document.getElementById('patient-email').value.trim();
        const dateVal = document.getElementById('preferred-date').value;
        const serviceVal = document.getElementById('service-needed').value;

        // Basic inputs check validation
        if (!nameVal || !phoneVal || !emailVal || !dateVal || !serviceVal) {
            alert('Please check and fill out all fields.');
            return;
        }

        // Close form panel overlay
        closeBookingForm();

        // Print details to the chat log
        addMessage('user', `Booking Request Details:\n• Name: ${nameVal}\n• Phone: ${phoneVal}\n• Service: ${serviceVal}\n• Date: ${dateVal}`);

        // Trigger loading indicator response
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();

            // Success response message blocks
            const serviceCapitalized = serviceVal.charAt(0).toUpperCase() + serviceVal.slice(1);
            addMessage('bot', `🎉 Thank you, <strong>${nameVal}</strong>! We have received your booking request for a <strong>${serviceCapitalized}</strong> session on <strong>${dateVal}</strong>.\n\nOur SmileBright scheduling managers will contact you directly via phone at <strong>${phoneVal}</strong> or email at <strong>${emailVal}</strong> within 2 hours to confirm your booking and sync payment details.`, true);

            // Reset form details
            appointmentForm.reset();
        }, 1500);
    });

    // Auto-open chatbot if booking triggers or demo CTAs inside landing page are clicked
    const demoTriggers = document.querySelectorAll('.demo-trigger');
    demoTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!isChatOpen) {
                toggleChat();
            }
            // Add a tiny delay to ensure chatbot is active and greet completed, then open form
            setTimeout(() => {
                openBookingForm();
            }, 500);
        });
    });

    // --- Mobile Responsive Navbar Toggle ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu if a nav-link is clicked on mobile
        const navLinks = navMenu.querySelectorAll('a, button');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

});
