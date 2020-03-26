$(document).ready(function () {
    const socket = new WebSocket("ws://localhost:3000/ws");
    let sessionData;

    socket.onmessage = (message) => {
        message = JSON.parse(message.data);

        if (message.type == 'SESSION_DATA') {
            sessionData = message.payload;

            $('#id-container b').text(sessionData.conversationId);
        } else if (message.type == 'MESSAGE') {
            if (message.payload.senderId == sessionData.userId)
                $('#message-container').append(`<div class="message mine"><span>${message.payload.text}</span></div>`);
            else
                $('#message-container').append(`<div class="message"><span>${message.payload.text}</span></div>`);
        }
    };

    $(this).on('click', '#submit', function () {
        socket.send(JSON.stringify({
            type: 'MESSAGE',
            payload: {
                text: $('#message').val(),
                timestamp: new Date().getTime()
            }
        }));
    });

    $(this).on('click', '#submit-conversation-id', function () {
        socket.send(JSON.stringify({
            type: 'CONNECT',
            payload: {
                conversationId: $('#conversation-id').val()
            }
        }));
    });
});